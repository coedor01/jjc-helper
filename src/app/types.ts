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
