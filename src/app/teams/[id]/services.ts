import prisma from "@/client";
import { TeamOut, TeamMember } from "./schemas";

function transformMembers(
  items: {
    currentScore: number;
    maxScore: number;
    confirmed: boolean;
    role: {
      name: string;
      server: {
        name: string;
      };
      xf: {
        name: string;
        icon: string;
      };
    };
  }[]
): TeamMember[] {
  const tItems = [];
  for (const item of items) {
    tItems.push({
      avatar: item.role.xf.icon,
      name: item.role.xf.name,
      currentScore: item.currentScore,
      maxScore: item.maxScore,
      confirmed: item.confirmed,
    });
  }
  return tItems;
}

function formatSecondTimestampToTime(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 将秒级时间戳转为毫秒级时间戳

  // 获取星期几
  const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayOfWeek = daysOfWeek[date.getDay()]; // 获取星期

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // 小时：两位数
    minute: "2-digit", // 分钟：两位数
    hour12: false, // 24 小时制
  };

  const time = date.toLocaleString("en-GB", options).replace(",", ""); // 只格式化时间部分

  // 返回格式化的"周X 时:分"
  return `${dayOfWeek} ${time}`;
}

function countLevel(members: { maxScore: number }[]): string {
  const minMaxScore = Math.min(...members.map((item) => item.maxScore));
  const level = Math.floor((minMaxScore - 1000) / 100);
  return `${level}段`;
}

export async function getTeam(id: number): Promise<TeamOut | null> {
  const item = await prisma.team.findFirst({
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
          id: true,
          currentScore: true,
          maxScore: true,
          confirmed: true,
          role: {
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
          },
        },
      },
    },
    where: {
      id,
    },
  });

  return (
    item && {
      id: item.id,
      level: countLevel(item.TeamMember),
      startAt: formatSecondTimestampToTime(item.startAt),
      confirmAdvancedMinutes: item.confirmAdvancedMinutes,
      clientType: item.clientType.label,
      teamType: item.type.label,
      members: transformMembers(item.TeamMember),
      currentMemberCount: item.TeamMember.length,
      maxMemberCount: item.type.maxMemberCount,
    }
  );
}
