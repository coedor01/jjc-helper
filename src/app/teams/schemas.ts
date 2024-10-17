interface Member {
  avatar: string,
}

export interface TeamOut {
  id: number,
  teamType: string,
  clientType: string,
  startAt: string,
  level: string,
  members: Member[],
  currentMemberCount: number,
  maxMemberCount: number,
}