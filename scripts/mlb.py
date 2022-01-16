import json
import requests


class MLB:
    def __init__(self):
        self.team_ids = dict()
        self.games = []

    def get_teams(self):
        team_data = requests.get("http://statsapi.mlb.com/api/v1/teams?sportId=1").json()['teams']
        self.team_ids = {team['id']: team['name'] for team in team_data}
        with open("data/mlb/team_ids.json", 'w') as file:
            json.dump(self.team_ids, file)

    def get_elos(self):
        elo_vals = {}
        elo_hist = {}
        for year in range(2010, 2022):
            game_data = requests.get(
                f"http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate={year}-01-28&endDate={year}-11-29").json()
            for date_data in game_data['dates']:
                game_date = date_data['date']
                for game in date_data['games']:
                    if game['gameType'] not in ['R', 'F', 'D', 'L', 'W', 'C', 'P']:
                        continue
                    elif game['gameType'] == 'R':
                        k = 16
                    else:
                        k = 32
                    winner = None
                    loser = None
                    try:
                        if game['teams']['away']['isWinner']:
                            winner = game['teams']['away']['team']['id']
                            loser = game['teams']['home']['team']['id']
                        elif game['teams']['home']['isWinner']:
                            winner = game['teams']['home']['team']['id']
                            loser = game['teams']['away']['team']['id']
                    except KeyError:
                        pass
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
        with open("data/mlb/elo_history.json", 'w') as file:
            json.dump(elo_hist, file)
        with open("data/mlb/elo_vals.json", 'w') as file:
            json.dump(elo_vals, file)


if __name__ == "__main__":
    mlb = MLB()
    mlb.get_teams()
    mlb.get_elos()
