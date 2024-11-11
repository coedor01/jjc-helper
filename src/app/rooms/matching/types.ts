interface EnterRoomData {
  server: string;
  name: string;
  roomId: number;
}

export type StatusType = "HOME" | "ROOM" | "MATCHING" | "TEAM";

export interface CurrentStatusData {
  status: StatusType;
}
