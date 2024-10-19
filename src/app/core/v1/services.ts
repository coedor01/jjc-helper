import { PrismaClient, User } from "@prisma/client";
import { UserCreate, UserUpdate } from "./schemas";

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
