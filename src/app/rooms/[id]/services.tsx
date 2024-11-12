import { getSTimestamp } from "@/utils/common";
import prisma from "@/client";

interface GetRoomProps {
  server: string;
  name: string;
  roomExistMinutes: number;
}

interface Room {
  id: number;
}

export async function getRoom({
  server,
  name,
  roomExistMinutes,
}: GetRoomProps): Promise<Room | null> {
  const now = new Date();
  now.setMinutes(now.getMinutes() - roomExistMinutes);
  const createAtBoundary = getSTimestamp(now);

  const rel = await prisma.userRoomRelation.findFirst({
    orderBy: { id: "desc" },
    where: {
      server,
      name,
      createAt: {
        gte: createAtBoundary,
      },
    },
  });

  let data = null;
  if (rel) {
    data = { id: rel.roomId };
  }

  return data;
}

interface RoomDetail extends Room {
  members: { name: string; server: string }[];
}

interface GetRoomDetailProps {
  id: number;
  password: string;
  roomExistMinutes: number;
}

export async function getRoomDetail({
  id,
  password,
  roomExistMinutes,
}: GetRoomDetailProps): Promise<RoomDetail | null> {
  const now = new Date();
  now.setMinutes(now.getMinutes() - roomExistMinutes);

  const room = await prisma.room.findFirst({
    select: {
      id: true,
      password: true,
      UserRoomRelation: {
        select: {
          name: true,
          server: true,
        },
      },
    },
    where: {
      id,
    },
  });

  let data: RoomDetail | null = null;
  if (room && room?.password === password) {
    const members = [];
    for (const member of room.UserRoomRelation) {
      members.push(member);
    }
    data = { id: room.id, members };
  }

  return data;
}
