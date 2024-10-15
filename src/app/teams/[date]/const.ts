export enum OrderByEnum {
  DEAFULT = "DEAFULT",
  TIME = "TIME",
  PIGEON_POINTS = "PIGEON_POINTS",
}

export enum TeamTypeEnum {
  _2V2 = "2V2",
  _3V3 = "3V3",
  _5V5 = "5V5",
}

export enum ClientTypeEnum {
  QJ = "QJ",
  WJ = "WJ",
}

export enum TimeTypeEnum {
  IN_ADVANCE = "IN_ADVANCE",
  IMMEDIATELY = "IMMEDIATELY",
}

export enum TeamsQueries {
  DATE_START_TS = "dateStartTs",
  DATE_END_TS = "dateEndTs",
  TEAM_TYPE = "teamType",
  CLIENT_TYPE = "clientType",
  TIME_TYPE = "timeType",
}

export const DEFAULT_QUERIES = {
  [TeamsQueries.TEAM_TYPE]: TeamTypeEnum._3V3,
  [TeamsQueries.CLIENT_TYPE]: ClientTypeEnum.QJ,
  [TeamsQueries.TIME_TYPE]: TimeTypeEnum.IN_ADVANCE,
}