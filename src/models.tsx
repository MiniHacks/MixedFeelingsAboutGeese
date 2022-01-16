export interface EloPoint {
  elo: number;
  date: string;
}
export interface Team {
  name: string;
  league: string;
  elo: number;
  elo_history: EloPoint[]
}