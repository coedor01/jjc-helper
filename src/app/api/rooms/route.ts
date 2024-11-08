import { getSTimestamp } from "@/app/utils";
import prisma from "@/client";
import { NextRequest, NextResponse } from "next/server";

export interface RoomCreateRequest {
  server: string;
  name: string;
  password: string;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const server = params.get("server");
  const name = params.get("name");
  let minutesAgo = Number(params.get("minutesAgo")) as number;

  if (!server || !name) {
    return NextResponse.json(
      { ok: false, error: "需要提供server和name参数" },
      { status: 200 }
    );
  }

  if (!minutesAgo) {
    minutesAgo = 5;
  }
  const now = new Date();
  now.setMinutes(now.getMinutes() - minutesAgo);
  const createAtBoundary = getSTimestamp(now);
  console.log(`createAtBoundary=${createAtBoundary}`);

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
    const room = await prisma.room.findFirst({
      select: {
        id: true,
        UserRoomRelation: { select: { name: true, server: true } },
      },
      where: { id: rel.roomId },
    });
    const members = [];
    if (room && room?.UserRoomRelation) {
      members.push(...room.UserRoomRelation);
      data = { id: room.id, members };
    }
  }

  return NextResponse.json({ ok: true, data: data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body: RoomCreateRequest = await request.json();
  const now = new Date();
  const createAt = getSTimestamp(now);

  const room = await prisma.room.create({
    data: {
      password: body.password,
      createAt,
    },
  });

  await prisma.userRoomRelation.create({
    data: {
      server: body.server,
      name: body.name,
      createAt,
      roomId: room.id,
    },
  });

  return NextResponse.json(
    { ok: true, data: { id: room.id } },
    { status: 200 }
  );
}
