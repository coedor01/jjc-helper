export enum OrderByEnum {
  DEAFULT = "DEAFULT",
  TIME = "TIME",
  PIGEON_POINTS = "PIGEON_POINTS",
}

export enum TeamTypeEnum {
  _2V2 = "1",
  _3V3 = "2",
  _5V5 = "3",
}

export enum ClientTypeEnum {
  QJ = "1",
  WJ = "2",
}

export enum TeamsQueries {
  DATE = "date",
  TEAM_TYPE = "teamType",
  CLIENT_TYPE = "clientType",
}

export const DEFAULT_QUERIES = {
  [TeamsQueries.TEAM_TYPE]: TeamTypeEnum._3V3,
  [TeamsQueries.CLIENT_TYPE]: ClientTypeEnum.QJ,
};

export const ROOT_PATH = "/teams";
