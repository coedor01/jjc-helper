import fs from "fs";
import path from "path";

export function readLocalJsonFile(fp: string): any {
  // 构造文件的绝对路径
  const filePath = path.join(process.cwd(), "/public", fp);

  // 同步读取文件内容并解析 JSON
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  return data;
}
