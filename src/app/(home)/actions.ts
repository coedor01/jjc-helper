"use server";

import { redirect } from "next/navigation";
import { GameRole } from "../types";
import { getSTimestamp } from "../utils";
import prisma from "@/client";

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
