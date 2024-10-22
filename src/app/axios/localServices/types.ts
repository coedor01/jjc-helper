export interface CreatedTeam {
  id: number;
  startAt: number;
  confirmAdvancedMinutes: number;
  clientTypeId: number;
  teamTypeId: number;
  member: CreatedTeamMember;
}

export interface CreatedTeamMember {
  id: number;
  currentScore: number;
  maxScore: number;
  playDuration: number;
  teamId: number;
  gameRoleId: number;
  userId: number;
}
