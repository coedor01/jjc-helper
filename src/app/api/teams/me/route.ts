import { MyTeam } from "@/app/core/v1/schemas";
import { getSessionUser } from "@/app/core/v1/services";
import { weekDayFormat } from "@/app/utils";
import prisma from "@/client";
import { NextRequest, NextResponse } from "next/server";

function getWeekDay(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 将秒级时间戳转为毫秒级时间戳
  return weekDayFormat(date.getDay());
}

function countLevel(members: { maxScore: number }[]): string {
  const minMaxScore = Math.min(...members.map((item) => item.maxScore));
  const level = Math.floor((minMaxScore - 1000) / 100);
  return `${level}段`;
}
function formatSecondTimestampToTime(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 将秒级时间戳转为毫秒级时间戳

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // 小时：两位数
    minute: "2-digit", // 分钟：两位数
    hour12: false, // 24 小时制
  };

  // 返回本地时区的格式化日期和时间
  return date.toLocaleString("en-GB", options).replace(",", "");
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const user = await getSessionUser(prisma);
  if (user) {
    const teamMembers = await prisma.teamMember.findMany({
      select: {
        teamId: true,
      },
      where: {
        userId: user.id,
      },
    });
    const teamIds: number[] = [];
    for (const member of teamMembers) {
      teamIds.push(member.teamId);
    }
    let status = searchParams.get("status");
    if (status === null) {
      status = "0";
    }
    let data: MyTeam[] = [];
    if (teamIds.length > 0) {
      const items = await prisma.team.findMany({
        select: {
          id: true,
          startAt: true,
          confirmAdvancedMinutes: true,
          clientType: {
            select: {
              label: true,
            },
          },
          type: {
            select: {
              label: true,
              maxMemberCount: true,
            },
          },
          TeamMember: {
            select: {
              userId: true,
              maxScore: true,
              role: {
                select: {
                  xf: {
                    select: {
                      icon: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: {
            in: teamIds,
          },
          status: Number(status),
        },
        orderBy: {
          startAt: "asc",
        },
      });

      data = items.map((item) => ({
        id: item.id,
        teamType: item.type.label,
        clientType: item.clientType.label,
        startAtText: formatSecondTimestampToTime(item.startAt),
        level: countLevel(item.TeamMember),
        members: item.TeamMember.map((member) => ({
          avatar: member.role.xf.icon,
        })),
        currentMemberCount: item.TeamMember.length,
        maxMemberCount: item.type.maxMemberCount,
        weekDayText: getWeekDay(item.startAt),
      }));
    }
    return NextResponse.json({ ok: true, data, multi: true });
  }
  return NextResponse.json(
    { ok: false, error: "用户信息错误" },
    { status: 200 }
  );
}
