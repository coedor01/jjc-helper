import {
  createGameRole,
  formatRoleName,
  getSessionUser,
} from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await getSessionUser(prisma);
  if (user) {
    const items = await prisma.gameRole.findMany({
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
        userId: user.id,
      },
    });

    const data = items.map((item) => ({
      id: item.id,
      name: `${item.xf.name}·${item.name}·${item.server.name}`,
      icon: item.xf.icon,
    }));
    return NextResponse.json({ ok: true, data: data });
  }
  return NextResponse.json(
    { ok: false, error: "用户信息有误" },
    { status: 200 }
  );
}

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

  return NextResponse.json(
    { ok: false, error: "用户信息有误" },
    { status: 200 }
  );
}
