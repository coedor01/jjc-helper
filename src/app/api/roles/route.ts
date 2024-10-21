import {
  createGameRole,
  fetchUserByEmail,
  formatRoleName,
} from "@/app/core/v1/services";
import { getServerSession } from "next-auth";
import prisma from "@/client";
import { NextResponse } from "next/server";

interface PostBody {
  server: string;
  xinFa: string;
  roleName: string;
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (email) {
    const body: PostBody = await req.json();
    const user = await fetchUserByEmail(prisma, email);
    if (user?.id) {
      const id = await createGameRole(prisma, {
        userId: user.id,
        serverId: Number(body.server) as number,
        xinFaId: Number(body.xinFa) as number,
        name: body.roleName as string,
      });
      const item = await prisma.gameRole.findFirst({
        select: {
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
          name: formatRoleName({
            roleName: item.name,
            serverName: item.server.name,
            xinFaName: item.xf.name,
          }),
          icon: item.xf.icon,
        });
      }
    }
  }
  return NextResponse.json({ error: "用户信息有误" }, { status: 400 });
}
