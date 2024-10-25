import {
  ClientType,
  PrismaClient,
  Server,
  Team,
  TeamMember,
  TeamType,
  User,
  XinFa,
} from "@prisma/client";
import { GameRoleOut, UserCreate, UserUpdate } from "./schemas";
import { getServerSession } from "next-auth";

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
  data: {
    userId: number;
    serverId: number;
    xinFaId: number;
    name: string;
  }
): Promise<number> {
  const item = await db.gameRole.create({
    data: data,
  });
  return item.id;
}

export async function deleteGameRole(
  db: PrismaClient,
  { id }: { id: number }
): Promise<undefined> {
  await db.gameRole.delete({
    where: {
      id,
    },
  });
}

export function formatRoleName(data: {
  roleName: string;
  serverName: string;
  xinFaName: string;
}): string {
  return `${data.xinFaName}·${data.roleName}·${data.serverName}`;
}

export async function getSessionUser(db: PrismaClient): Promise<User | null> {
  const session = await getServerSession();
  const email = session?.user?.email;

  let user = null;
  if (email) {
    user = await fetchUserByEmail(db, email);
  }
  return user;
}

export async function fetchTeamById(
  db: PrismaClient,
  id: number
): Promise<Team | null> {
  const row = await db.team.findFirst({
    where: { id },
  });
  return row;
}

export async function createTeam(
  db: PrismaClient,
  data: {
    userId: number;
    startAt: number;
    confirmAdvancedMinutes: number;
    clientTypeId: number;
    teamTypeId: number;
  }
): Promise<Team> {
  const row = await db.team.create({
    data: data,
  });
  return row;
}

export async function fetchClientTypes(
  db: PrismaClient
): Promise<ClientType[]> {
  const rows = await db.clientType.findMany();
  return rows;
}

export async function fetchTeamTypes(db: PrismaClient): Promise<TeamType[]> {
  const rows = await db.teamType.findMany();
  return rows;
}

export async function getTeamTypesMap(
  db: PrismaClient
): Promise<Map<number, TeamType>> {
  const items = await fetchTeamTypes(db);
  const typeTypeMap = new Map();
  for (const item of items) {
    typeTypeMap.set(item.id, item);
  }
  return typeTypeMap;
}

export async function createTeamMember(
  db: PrismaClient,
  data: {
    currentScore: number;
    maxScore: number;
    playDuration: number;
    teamId: number;
    gameRoleId: number;
    userId: number;
  }
): Promise<TeamMember> {
  const row = await db.teamMember.create({
    data: data,
  });
  return row;
}

export async function deleteTeamMember(
  db: PrismaClient,
  userId: number,
  teamId: number
) {
  await db.teamMember.deleteMany({
    where: {
      userId,
      teamId,
    },
  });
}

export async function confirmTeamMember(
  db: PrismaClient,
  userId: number,
  teamId: number
): Promise<TeamMember> {
  const item = await db.teamMember.update({
    data: {
      confirmed: true,
    },
    where: {
      userId_teamId: {
        userId: userId,
        teamId: teamId,
      },
    },
  });
  return item;
}

export async function changeTeamStatus(
  db: PrismaClient,
  id: number,
  status: number
) {
  const item = await db.team.update({
    data: {
      status,
    },
    where: {
      id,
    },
  });
  return item;
}

export async function getGameRoles(
  db: PrismaClient,
  userId: number
): Promise<GameRoleOut[]> {
  const items = await db.gameRole.findMany({
    select: {
      id: true,
      name: true,
      server: {
        select: {
          name: true,
        },
      },
      xf: {
        select: {
          name: true,
          icon: true,
        },
      },
    },
    where: { userId },
  });
  return items;
}
