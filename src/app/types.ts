export interface Server {
  id: string;
  name: string;
}

export interface TeamType {
  id: number;
  label: string;
  value: string;
  maxMemberCount: number;
}

export interface ClientType {
  id: number;
  label: string;
}

export interface GameRole {
  zoneName: string;
  roleName: string;
  serverName: string;
  kungfuId: string;
  panelList: panelList;
}

export interface panelList {
  score: number;
  panel: {
    name: string;
    percent: boolean;
    value: number;
  }[];
}

export interface Room {
  id: number;
}
