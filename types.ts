export interface OddsLine {
  value: string;
  odds?: string;
}

// For Spread and MoneyLine where there's a value for each team
export interface PairedBetType {
  teamA: OddsLine;
  teamB: OddsLine;
}

// For the main game total Over/Under prediction
export interface TotalBetType {
  prediction: 'Over' | 'Under';
  value: string;
  odds: string;
}

// For individual team total Over/Under predictions
export interface TeamTotalBetType {
  prediction: 'Over' | 'Under';
  value: string;
  odds: string;
}

export interface Odds {
  spread?: PairedBetType;
  moneyLine?: PairedBetType;
  overUnder?: TotalBetType;
  teamTotals?: {
    teamA: TeamTotalBetType;
    teamB: TeamTotalBetType;
  };
}


export interface Analysis {
  teamA: string;
  teamB: string;
  predictedWinner: string;
  confidence: string; // e.g., 'High', 'Medium', 'Low'
  analysis: string;
  oddsSources?: string[]; // List of sportsbooks used for averaging
  odds?: Odds;
}

export interface Source {
  uri: string;
  title: string;
}

export interface Game {
  teamA: string;
  teamB: string;
  sport: string;
  dateTime: string;
}

export interface Underdog {
  teamName: string;
  matchup: string;
  moneyLine: string;
  dateTime: string;
}

// Types for the new Team Stats feature
export interface Player {
  name: string;
  position: string;
}

export interface Injury {
  playerName: string;
  status: string;
  details: string;
}

export interface GameResult {
  opponent: string;
  score: string;
  result: 'W' | 'L';
}

export interface SeasonStats {
  season: string;
  wins: number;
  losses: number;
  keyStats: {
    [key: string]: string;
  };
}

export interface TeamStatsData {
  teamName: string;
  currentSeason: SeasonStats;
  lastSeason: SeasonStats;
  aTeamLineup: Player[];
  fullRoster: Player[];
  injuryReport: Injury[];
  recentGames: GameResult[];
}