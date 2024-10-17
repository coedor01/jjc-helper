export interface TeamMember {
  avatar: string;
  name: string;
  currentScore: number;
  maxScore: number;
  confirmed: boolean;
}

export interface TeamOut {
  id: number;
  level: string;
  startAt: string;
  confirmAdvancedMinutes: number;
  clientType: string;
  teamType: string;
  members: TeamMember[];
  currentMemberCount: number;
  maxMemberCount: number;
}
