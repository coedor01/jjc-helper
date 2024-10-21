import {
  createGameRole,
  deleteGameRole,
  formatRoleName,
  getSessionUser,
} from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

interface PostBody {
  serverId: number;
  xinFaId: number;
  name: string;
}

export async function POST(req: Request) {
  const user = await getSessionUser(prisma);
  if (user) {
    const body: PostBody = await req.json();
    const id = await createGameRole(prisma, {
      userId: user.id,
      ...body,
    });
    const item = await prisma.gameRole.findFirst({
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
      where: {
        id,
      },
    });
    if (item) {
      return Response.json({
        ok: true,
        data: {
          id: item.id,
          name: formatRoleName({
            roleName: item.name,
            serverName: item.server.name,
            xinFaName: item.xf.name,
          }),
          icon: item.xf.icon,
        },
      });
    }
  }

  return NextResponse.json({ error: "用户信息有误" }, { status: 400 });
}

interface DeleteBody {
  id: number;
}

export async function DELETE(req: Request) {
  const user = await getSessionUser(prisma);
  if (user) {
    const body: DeleteBody = await req.json();
    await deleteGameRole(prisma, body);
    return Response.json({
      ok: true,
    });
  }
  return NextResponse.json({ error: "用户信息有误" }, { status: 400 });
}
