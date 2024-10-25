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

export interface TeamMemberDetail {
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
  isMe: boolean;
}

export interface TeamDetail {
  id: number;
  level: string;
  startAt: number;
  startAtText: string;
  confirmAdvancedMinutes: number;
  clientType: string;
  teamType: string;
  members: TeamMemberDetail[];
  currentMemberCount: number;
  maxMemberCount: number;
  status: number;
  inTeam: boolean;
  confirmed: boolean;
}

interface MemberOut {
  avatar: string;
}

export interface TeamOut {
  id: number;
  teamType: string;
  clientType: string;
  startAtText: string;
  level: string;
  members: MemberOut[];
  currentMemberCount: number;
  maxMemberCount: number;
  joined: boolean;
}

export interface MyTeam {
  id: number;
  teamType: string;
  clientType: string;
  startAtText: string;
  level: string;
  members: MemberOut[];
  currentMemberCount: number;
  maxMemberCount: number;
  weekDayText: string;
}

export interface GameRoleOut {
  id: number;
  name: string;
  server: { name: string };
  xf: {
    name: string;
    icon: string;
  };
}
