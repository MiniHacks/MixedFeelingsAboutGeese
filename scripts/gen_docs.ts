
import elo_history from './data/mlb/elo_history.json';
import elo from './data/mlb/elo_vals.json';
import team_ids from './data/mlb/team_ids.json'
import { Team } from '../src/models'

console.log(elo)
console.log(Object.keys(team_ids))

export const teams: Array<Team> = Object.keys(team_ids).map(key =>
  ({ name: team_ids[key],
    league: "MLB",
    elo: Math.round(elo[key]),
    elo_history: Object.keys(elo_history[key]).map(date => (
      {
        date: date,
        elo: Math.round(elo_history[key][date])
      } 
    ))
  }));

