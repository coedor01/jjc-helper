export interface UserUpdate {
  qq: string | null;
  phone: string | null;
}

export interface UserCreate extends UserUpdate {
  email: string;
  hashedPassword: string;
}

export interface UserOut extends UserUpdate {
  email: string;
  id: string;
}

export interface RoleOut {
  id: number;
  name: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface TeamMemberOut {
  id: number;
  userId: number;
  avatar: string;
  name: string;
  currentScore: number;
  maxScore: number;
  confirmed: boolean;
  playDurationText: string | null;
  pigeonTotalText: string | null;
  pigeonTimeStatsArr: StatItem[];
  xinfaStatsArr: StatItem[];
}

export interface TeamOut {
  id: number;
  level: string;
  startAt: string;
  startAtTs: number;
  confirmAdvancedMinutes: number;
  clientType: string;
  teamType: string;
  members: TeamMemberOut[];
  currentMemberCount: number;
  maxMemberCount: number;
}
