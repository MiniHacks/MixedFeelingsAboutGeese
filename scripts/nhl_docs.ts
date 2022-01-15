
import * as elo_history from './data/nhl/elo_history.json';
import * as elo from './data/nhl/elo_vals.json';
import * as team_ids from './data/nhl/team_ids.json'

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

console.log(elo_history)