import datetime
import json
import requests


class NBA:
    def __init__(self):
        self.team_ids = dict()
        self.games = []

    def get_teams(self):
        team_data = requests.get("https://data.nba.com/prod/v1/2021/teams.json").json()
        for team in team_data['league']['standard']:
            if team['isNBAFranchise']:
                self.team_ids[team['teamId']] = team['fullName']
        with open("data/nba/team_ids.json", 'w') as file:
            json.dump(self.team_ids, file)

    def get_elos(self):
        elo_vals = {}
        elo_hist = {}
        for year in range(2015, 2022):
            nba_req = requests.get(f"https://data.nba.com/prod/v1/{year}/schedule.json").json()
            for game in nba_req['league']['standard']:
                if game['seasonStageId'] in [2, 4] and game['statusNum'] == 3:
                    game_date = str(
                        (datetime.datetime.strptime(game['startTimeUTC'].split(".")[0], '%Y-%m-%dT%H:%M:%S') + datetime.timedelta(hours=-6)).date())
                    if game['seasonStageId'] == 2:
                        k = 16
                    elif game['seasonStageId'] == 4:
                        k = 32
                    winner = None
                    loser = None
                    if int(game['vTeam']['score']) > int(game['hTeam']['score']):
                        winner = game['vTeam']['teamId']
                        loser = game['hTeam']['teamId']
                    elif int(game['vTeam']['score']) < int(game['hTeam']['score']):
                        winner = game['hTeam']['teamId']
                        loser = game['vTeam']['teamId']
                    if winner is None and loser is None:
                        continue
                    if winner not in elo_vals:
                        elo_vals[winner] = 1400
                        elo_hist[winner] = {}
                    if loser not in elo_vals:
                        elo_vals[loser] = 1400
                        elo_hist[loser] = {}
                    winner_expected = 1 / (1 + 10 ** ((elo_vals[loser] - elo_vals[winner]) / 400))
                    loser_expected = 1 / (1 + 10 ** ((elo_vals[winner] - elo_vals[loser]) / 400))
                    elo_vals[winner] += k * (1 - winner_expected)
                    elo_vals[loser] += k * (0 - loser_expected)
                    elo_hist[winner][game_date] = elo_vals[winner]
                    elo_hist[loser][game_date] = elo_vals[loser]
        with open("data/nba/elo_history.json", 'w') as file:
            json.dump(elo_hist, file)
        with open("data/nba/elo_vals.json", 'w') as file:
            json.dump(elo_vals, file)


if __name__ == "__main__":
    nba = NBA()
    nba.get_teams()
    nba.get_elos()
