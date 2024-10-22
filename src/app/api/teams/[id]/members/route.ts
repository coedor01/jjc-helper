import {
  createTeamMember,
  deleteTeamMember,
  getSessionUser,
} from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

interface PostBody {
  currentScore: number;
  maxScore: number;
  playDuration: number;
  gameRoleId: number;
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser(prisma);
  if (user) {
    const teamId = Number((await params).id) as number;
    const body: PostBody = await req.json();
    const teamMember = await createTeamMember(prisma, {
      userId: user.id,
      teamId,
      ...body,
    });
    return NextResponse.json({ ok: true, data: teamMember });
  }
  return NextResponse.json(
    { error: "用户信息或队伍信息有误" },
    { status: 400 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser(prisma);
  if (user) {
    const teamId = Number((await params).id) as number;

    await deleteTeamMember(prisma, user.id, teamId);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json(
    { error: "用户信息或队伍信息有误" },
    { status: 400 }
  );
}
