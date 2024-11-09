import fs from "fs";
import path from "path";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

export function getDateString(date: Date) {
  // getMonth() 方法根据本地时间，返回一个指定的日期对象的月份，为基于 0 的值（0 表示一年中的第一月）。
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function toQueryString(searchParams: {
  [key: string]: string | string[] | undefined;
}): string {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value !== undefined) {
      params.set(key, value);
    }
  });

  return params.toString();
}

export function getSTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function getMSTimestamp(date: Date) {
  return date.getTime();
}

export function stringToDate(dateString: string, hoursDelta: number): Date {
  const date = new Date(dateString);
  date.setHours(date.getHours() - hoursDelta);
  return date;
}

export function weekDayFormat(currentDay: number, dayOffset: number = 0) {
  const weekChinese: string[] = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
  ];

  const targetDay = currentDay + dayOffset;
  let nextWeek = Math.floor(targetDay / 7);
  const day = targetDay % 7;
  if (currentDay === 0 && targetDay != currentDay) {
    nextWeek++;
  } else if (currentDay !== 0 && day === 0) {
    nextWeek--;
  }

  return "下".repeat(nextWeek) + weekChinese[day];
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function readLocalJsonFile(fp: string): any {
  // 构造文件的绝对路径
  const filePath = path.join(process.cwd(), "/public", fp);

  // 同步读取文件内容并解析 JSON
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  return data;
}
