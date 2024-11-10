interface EnterRoomData {
  server: string;
  name: string;
  roomId: number;
}

export type StatusType = "NULL" | "ROOM" | "TEAM";

export interface CurrentStatusData {
  status: StatusType;
}
