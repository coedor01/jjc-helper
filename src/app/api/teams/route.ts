import {
  createTeam,
  createTeamMember,
  getSessionUser,
} from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

interface PostBody {
  startAt: number;
  confirmAdvancedMinutes: number;
  clientTypeId: number;
  teamTypeId: number;
  member: {
    currentScore: number;
    maxScore: number;
    playDuration: number;
    gameRoleId: number;
  };
}

export async function POST(req: Request) {
  const user = await getSessionUser(prisma);
  if (user) {
    const body: PostBody = await req.json();
    const { member, ...noMemberBody } = body;
    const team = await createTeam(prisma, { userId: user.id, ...noMemberBody });
    const teamMember = await createTeamMember(prisma, {
      teamId: team.id,
      userId: user.id,
      ...member,
    });
    return NextResponse.json({
      ok: true,
      data: { member: teamMember, ...team },
    });
  }

  return NextResponse.json(
    { ok: false, error: "用户信息有误" },
    { status: 200 }
  );
}
