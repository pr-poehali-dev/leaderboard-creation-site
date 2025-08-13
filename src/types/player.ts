export interface Player {
  id: number;
  rank: number;
  username: string;
  score: number;
  country: string;
  flag: string;
  time: string;
  lastActive: string;
  clan?: string;
  team?: string;
  avatar?: string;
}

export interface Clan {
  name: string;
  members: number;
  avgScore: number;
  leader: string;
}

export interface Team {
  name: string;
  members: number;
  totalScore: number;
  captain: string;
}

export interface RegistrationData {
  username: string;
  email: string;
  country: string;
}