"use server";

import prisma from "@/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { GameRole, Room } from "@/app/types";
import { getSTimestamp } from "@/app/utils";

export async function getMyRoom(): Promise<Room | null> {
  let data = null;

  const cookieStore = await cookies();
  const serverCookie = cookieStore.get("server");
  const nameCookie = cookieStore.get("name");
  if (serverCookie && nameCookie) {
    const ownerServer = serverCookie.value;
    const ownerName = nameCookie.value;

    const room = await prisma.room.findFirst({
      orderBy: { id: "desc" },
      where: {
        ownerServer,
        ownerName,
      },
    });

    let data = null;
    if (room) {
      data = { id: room.id };
    }
  }

  return data;
}

export async function createRoom(gameRole: GameRole, formData: FormData) {
  const rawFormData = {
    password: formData.get("password") as string,
  };

  console.log(`rawFormData=${JSON.stringify(rawFormData)}`);

  if (rawFormData.password) {
    const now = new Date();
    const createAt = getSTimestamp(now);

    const room = await prisma.room.create({
      data: {
        ownerServer: gameRole.serverName,
        ownerName: gameRole.roleName,
        password: rawFormData.password,
        createAt,
      },
    });

    redirect("/rooms/me");
  }
}
