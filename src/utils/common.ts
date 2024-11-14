function getDateString(date: Date) {
  // getMonth() 方法根据本地时间，返回一个指定的日期对象的月份，为基于 0 的值（0 表示一年中的第一月）。
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function toQueryString(searchParams: {
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

function getSTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

function getMSTimestamp(date: Date) {
  return date.getTime();
}

function stringToDate(dateString: string, hoursDelta: number): Date {
  const date = new Date(dateString);
  date.setHours(date.getHours() - hoursDelta);
  return date;
}

function weekDayFormat(currentDay: number, dayOffset: number = 0) {
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeBtoa(str: string) {
  // 使用 TextEncoder 将字符串编码为 UTF-8 格式的字节数组
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);

  // 将字节数组转换为二进制字符串
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  // 使用 btoa 对二进制字符串进行 Base64 编码
  return btoa(binary);
}

function calculateBasicAuth(username: string, password: string) {
  // 拼接 "username:password"
  const credentials = `${username}:${password}`;

  // 使用安全的 Base64 编码方法
  const encodedCredentials = safeBtoa(credentials);

  // 返回格式化的 Authorization 头部
  return `Basic ${encodedCredentials}`;
}

export {
  getDateString,
  toQueryString,
  getSTimestamp,
  getMSTimestamp,
  stringToDate,
  weekDayFormat,
  sleep,
  calculateBasicAuth,
};
