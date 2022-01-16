import json

avg_elo = {}
for league in ['nfl', 'nba', 'mlb', 'nhl']:
    with open(f"data/{league}/team_ids.json") as file:
        teams = json.load(file)
    with open(f"data/{league}/elo_history.json") as file:
        elo_obj = json.load(file)
    for key in elo_obj:
        if key in teams:
            avg_elo[teams[key]] = sum(elo_obj[key].values()) / len(elo_obj[key])

with open("data/average_elo.json", 'w') as file:
    json.dump(avg_elo, file)