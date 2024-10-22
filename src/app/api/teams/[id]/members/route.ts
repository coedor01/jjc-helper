import {
  changeTeamStatus,
  createTeamMember,
  deleteTeamMember,
  fetchTeamById,
  getSessionUser,
  getTeamTypesMap,
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
  const teamId = Number((await params).id) as number;
  const team = await fetchTeamById(prisma, teamId);
  if (user && team) {
    const body: PostBody = await req.json();

    const members = await prisma.teamMember.findMany({
      select: { id: true },
      where: { teamId },
    });
    const teamTypesMap = await getTeamTypesMap(prisma);
    const memberCountFull =
      members.length === teamTypesMap.get(team.teamTypeId)?.maxMemberCount;
    const memberCountWillFull =
      members.length + 1 === teamTypesMap.get(team.teamTypeId)?.maxMemberCount;

    if (memberCountFull) {
      return NextResponse.json(
        { ok: false, error: "队伍已满员" },
        { status: 200 }
      );
    }
    const teamMember = await createTeamMember(prisma, {
      userId: user.id,
      teamId,
      ...body,
    });

    console.log(`members.length + 1=${members.length + 1}`);
    console.log(`memberCountWillFull=${memberCountWillFull}`);

    // 新成员加入后满员，则将队伍的状态改为1（已满员）
    if (memberCountWillFull) {
      await changeTeamStatus(prisma, teamId, 1);
    }
    return NextResponse.json({ ok: true, data: teamMember });
  }
  return NextResponse.json(
    { ok: false, error: "用户信息或队伍信息有误" },
    { status: 200 }
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
    { status: 200 }
  );
}
