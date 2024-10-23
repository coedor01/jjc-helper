export enum StatusEnum {
  OPEN = "0",
  CHECK = "1",
  CLOSE = "2",
}

export enum SchedulesQueries {
  STATUS = "status",
}

export const DEFAULT_QUERIES = {
  [SchedulesQueries.STATUS]: StatusEnum.OPEN,
};

export const ROOT_PATH = "/schedules";
