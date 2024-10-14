export interface WeekItemOtherQueries {
  dateStartTs: number;
  dateEndTs: number;
}

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