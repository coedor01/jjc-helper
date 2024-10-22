import {
  changeTeamStatus,
  confirmTeamMember,
  fetchTeamById,
  getSessionUser,
  getTeamTypesMap,
} from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser(prisma);
  const teamId = Number((await params).id) as number;
  const team = await fetchTeamById(prisma, teamId);
  if (user && team) {
    const data = await confirmTeamMember(prisma, user.id, teamId);
    const members = await prisma.teamMember.findMany({
      select: { confirmed: true },
      where: { teamId },
    });

    const teamTypesMap = await getTeamTypesMap(prisma);
    const memberCountFull =
      members.length === teamTypesMap.get(team.teamTypeId)?.maxMemberCount;
    const membersAllConfirmed = members
      .map((item) => item.confirmed)
      .reduce((accumulator, current) => accumulator && current, true);

    // 队伍满员且所有队员确认了，则将队伍的状态改为2（就绪）
    if (memberCountFull && membersAllConfirmed) {
      await changeTeamStatus(prisma, teamId, 2);
    }
    return NextResponse.json({ ok: true, data });
  }
  return NextResponse.json(
    { ok: false, error: "用户或队伍信息有误" },
    { status: 200 }
  );
}
