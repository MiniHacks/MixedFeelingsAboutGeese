import json
import requests


class NHL:
    def __init__(self):
        self.team_ids = dict()
        self.games = []

    def get_teams(self):
        team_data = requests.get("https://statsapi.web.nhl.com/api/v1/teams").json()['teams']
        self.team_ids = {team['id']: team['name'] for team in team_data}
        with open("data/nhl/team_ids.json", 'w') as file:
            json.dump(self.team_ids, file)

    def get_elos(self):
        elo_vals = {}
        elo_hist = {}
        for year in range(2010, 2023):
            game_data = requests.get(
                f"https://statsapi.web.nhl.com/api/v1/schedule?startDate=2009-10-01&endDate={year}-01-14").json()
            print("GOT THE DATA!")
            for date_data in game_data['dates']:
                game_date = date_data['date']
                for game in date_data['games']:
                    if game['gameType'] not in ['R', 'P']:
                        continue
                    elif game['gameType'] == 'R':
                        k = 16
                    elif game['gameType'] == 'P':
                        k = 32
                    winner = None
                    loser = None
                    if game['teams']['away']['score'] > game['teams']['home']['score']:
                        winner = game['teams']['away']['team']['id']
                        loser = game['teams']['home']['team']['id']
                    elif game['teams']['away']['score'] < game['teams']['home']['score']:
                        winner = game['teams']['home']['team']['id']
                        loser = game['teams']['away']['team']['id']
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
        with open("data/nhl/elo_history.json", 'w') as file:
            json.dump(elo_hist, file)
        with open("data/nhl/elo_vals.json",'w') as file:
            json.dump(elo_vals, file)


if __name__ == "__main__":
    nhl = NHL()
    # nhl.get_teams()
    nhl.get_elos()
