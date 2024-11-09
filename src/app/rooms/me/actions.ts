import prisma from "@/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Room {
  id: number;
}

export async function getMyRoom(): Promise<Room | null> {
  const cookieStore = await cookies();
  const serverCookie = cookieStore.get("server");
  const nameCookie = cookieStore.get("name");
  if (!serverCookie || !nameCookie) {
    redirect("/setRole");
  }
  const ownerServer = serverCookie.value;
  const ownerName = nameCookie.value;

  const now = new Date();

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

  return data;
}
