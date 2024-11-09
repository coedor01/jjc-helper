import fs from "fs";
import path from "path";

export default async function Dev() {
  // 构造文件的绝对路径
  const filePath = path.join(process.cwd(), "/public/servers.json");

  // 同步读取文件内容并解析 JSON
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContents);

  return <div>{JSON.stringify(data)}</div>;
}
