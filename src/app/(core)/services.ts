import prisma from "@/client";

export enum Config {
  ROOM_EXIST_MINUTES = "ROOM_EXIST_MINUTES",
}

export default async function getConfigMap(): Promise<Map<string, string>> {
  const configs = await prisma.config.findMany();
  const configMap = new Map();
  for (const config of configs) {
    configMap.set(config.key, config.value);
  }
  return configMap;
}
