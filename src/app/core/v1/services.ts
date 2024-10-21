import { GameRole, PrismaClient, Server, User, XinFa } from "@prisma/client";
import { UserCreate, UserUpdate } from "./schemas";
import prisma from "@/client";

export async function fetchUserByEmail(
  db: PrismaClient,
  email: string
): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function createUser(
  db: PrismaClient,
  item: UserCreate
): Promise<User> {
  const user = await db.user.create({
    data: {
      ...item,
    },
  });
  return user;
}

export async function updateUser(
  db: PrismaClient,
  id: number,
  item: UserUpdate
): Promise<User> {
  const user = await db.user.update({
    data: item,
    where: {
      id: id,
    },
  });

  return user;
}

export async function patchUserPassword(
  db: PrismaClient,
  id: number,
  hashedPassword: string
): Promise<User> {
  const user = await db.user.update({
    data: {
      hashedPassword,
    },
    where: {
      id: id,
    },
  });

  return user;
}

export async function fetchServers(db: PrismaClient): Promise<Server[]> {
  const items = await db.server.findMany();
  return items;
}

export async function fetchXinFas(db: PrismaClient): Promise<XinFa[]> {
  const items = await db.xinFa.findMany();
  return items;
}

export async function createGameRole(
  db: PrismaClient,
  {
    userId,
    serverId,
    xinFaId,
    name,
  }: {
    userId: number;
    serverId: number;
    xinFaId: number;
    name: string;
  }
): Promise<number> {
  const item = await prisma.gameRole.create({
    data: {
      name,
      userId,
      serverId,
      xinFaId,
    },
  });
  return item.id;
}

export function formatRoleName({
  roleName,
  serverName,
  xinFaName,
}: {
  roleName: string;
  serverName: string;
  xinFaName: string;
}): string {
  return `${xinFaName}·${roleName}·${serverName}`;
}
