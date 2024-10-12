import { PrismaClient } from '@prisma/client';
import { UserCreate, UserOut, UserUpdate, GuestCreate, GuestOut } from './schemas';

export async function fetchUserByUsername(
  db: PrismaClient,
  username: string,
): Promise<UserOut | null> {

  const user = await db.user.findUnique({
    where: {
      username: username,
    }
  });

  return user;
}

export async function fetchGuest(
  db: PrismaClient,
  signature: string,
): Promise<GuestOut | null> {

  const guest = await db.guest.findUnique({
    where: {
      signature: signature,
    }
  });

  return guest;
}

export async function createGuest(
  db: PrismaClient,
  item: GuestCreate,
): Promise<GuestOut> {

  const userBase = await db.userBase.create({});

  const guest = await db.guest.create({
    data: {
      id: userBase.id,
      ...item,
    },
  });
  return guest;
}

export async function createUser(
  db: PrismaClient,
  item: UserCreate,
): Promise<UserOut | null> {

  const userBase = await db.userBase.create({});

  const user = await db.user.create({
    data: {
      id: userBase.id,
      ...item,
    },
  });
  return user;
}

export async function updateUser(
  db: PrismaClient,
  id: number,
  item: UserUpdate,
): Promise<UserOut | null> {

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
  password: string,
): Promise<UserOut | null> {

  const user = await db.user.update({
    data: {
      password: password,
    },
    where: {
      id: id,
    },
  });

  return user;

}