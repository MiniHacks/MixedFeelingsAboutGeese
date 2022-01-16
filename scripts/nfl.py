import json
import requests


class NFL:
    def __init__(self):
        self.team_ids = dict()
        self.games = []

    def get_teams(self):
        team_data = requests.get("http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=1000").json()
        for team in team_data['sports'][0]['leagues'][0]['teams']:
            self.team_ids[team['team']['id']] = team['team']['displayName']
        with open("data/nfl/team_ids.json", 'w') as file:
            json.dump(self.team_ids, file)

    def get_elos(self):
        elo_vals = {}
        elo_hist = {}
        for year in range(2010, 2021):
            game_data = requests.get(f"http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates={year}0501-{year + 1}0301&limit=1000").json()
            try:
                print(len(game_data['events']))
            except KeyError:
                print(game_data)
                for key in game_data:
                    print(key)
                exit()

            for game in game_data['events']:
                if game['season']['type'] not in [2, 3] or game['shortName'] == "AFC @ NFC":
                    continue
                elif game['season']['type'] == 2:
                    k = 16
                elif game['season']['type'] == 3:
                    k = 32
                winner = None
                loser = None
                game_date = game['date'].split("T")[0]
                try:
                    if game['competitions'][0]['competitors'][0]['winner']:
                        winner = game['competitions'][0]['competitors'][0]['id']
                        loser = game['competitions'][0]['competitors'][1]['id']
                    elif game['competitions'][0]['competitors'][1]['winner']:
                        winner = game['competitions'][0]['competitors'][1]['id']
                        loser = game['competitions'][0]['competitors'][0]['id']
                except KeyError:
                    print(game)
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
        with open("data/nfl/elo_history.json", 'w') as file:
            json.dump(elo_hist, file)
        with open("data/nfl/elo_vals.json",'w') as file:
            json.dump(elo_vals, file)

if __name__ == "__main__":
    nfl = NFL()
    # nfl.get_teams()
    nfl.get_elos()