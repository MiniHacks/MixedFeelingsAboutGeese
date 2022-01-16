
import elo_history from './data/nhl/elo_history.json';
import elo from './data/nhl/elo_vals.json';
import team_ids from './data/nhl/team_ids.json'

interface EloPoint {
  elo: number;
  date: string;
}
interface Team {
  name: string;
  league: string;
  elo: number;
  elo_history: EloPoint[]
}

console.log(elo)
console.log(Object.keys(team_ids))

export const teams: Array<Team> = Object.keys(team_ids).map(key =>
  ({ name: team_ids[key],
    league: "NHL",
    elo: Math.round(elo[key]),
    elo_history: Object.keys(elo_history[key]).map(date => (
      {
        date: date,
        elo: Math.round(elo_history[key][date])
      } 
    ))
  }));

