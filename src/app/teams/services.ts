import prisma from "@/client";
import { TeamOut } from "./schemas";

interface TeamsQueries {
  startAtLeft: number;
  startAtRight: number;
  teamTypeIds: number[];
  clientTypeIds: number[];
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

export async function getTeams({
  startAtLeft,
  startAtRight,
  teamTypeIds,
  clientTypeIds,
}: TeamsQueries): Promise<TeamOut[]> {
  const whereClauses = {
    teamTypeId: {
      in: teamTypeIds,
    },
    clientTypeId: {
      in: clientTypeIds,
    },
    startAt: {
      gte: startAtLeft,
      lt: startAtRight,
    },
  };

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
    where: whereClauses,
    orderBy: {
      startAt: "asc",
    },
  });

  return items.map((item) => ({
    id: item.id,
    teamType: item.type.label,
    clientType: item.clientType.label,
    startAt: formatSecondTimestampToTime(item.startAt),
    level: countLevel(item.TeamMember),
    members: item.TeamMember.map((member) => ({ avatar: member.role.xf.icon })),
    currentMemberCount: item.TeamMember.length,
    maxMemberCount: item.type.maxMemberCount,
  }));
}
