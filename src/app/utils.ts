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