import prisma from "@/client";
import { TeamOut, TeamMemberOut, StatItem } from "./schemas";
import { weekDayFormat } from "@/app/utils";

interface TeamMember {
  id: number;
  userId: number;
  currentScore: number;
  maxScore: number;
  confirmed: boolean;
  playDuration: number;
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
}

interface TeamMemberStats {
  userId: number;
  isPigeon: boolean;
  team: { startAt: number };
  role: { xf: { name: string } };
}

const getPigeonTotalStatsMap = (
  stats: TeamMemberStats[]
): Map<number, { isPigeon: number; total: number }> => {
  const pigeonTotalStatsMap = new Map();

  for (const stat of stats) {
    let userStat = pigeonTotalStatsMap.get(stat.userId);
    if (userStat === undefined) {
      userStat = { isPigeon: 0, total: 0 };
    }
    if (stat.isPigeon) {
      userStat.isPigeon++;
    }
    userStat.total++;
    pigeonTotalStatsMap.set(stat.userId, userStat);
  }

  return pigeonTotalStatsMap;
};

const getPigeonTimeStatsMap = (
  stats: TeamMemberStats[]
): Map<number, { isPigeon: number; total: number }[]> => {
  const pigeonTimeStatsMap = new Map();

  for (const stat of stats) {
    let userStat = pigeonTimeStatsMap.get(stat.userId);
    if (userStat === undefined) {
      userStat = [
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
        { isPigeon: 0, total: 0 },
      ];
    }

    const date = new Date(stat.team.startAt * 1000);
    const day = date.getDay();
    console.log(`date=${date},day=${day};`);

    if (stat.isPigeon) {
      userStat[day].isPigeon++;
    }
    userStat[day].total++;
    pigeonTimeStatsMap.set(stat.userId, userStat);
  }
  return pigeonTimeStatsMap;
};

const getXinfaStatsMap = (
  stats: TeamMemberStats[]
): Map<number, Map<string, number>> => {
  const xinfaStatsMap = new Map();

  for (const stat of stats) {
    let userStat = xinfaStatsMap.get(stat.userId);
    if (userStat === undefined) {
      userStat = new Map();
    }

    let xfCount = userStat.get(stat.role.xf.name);
    if (xfCount === undefined) {
      console.log(stat.role.xf.name);

      xfCount = 0;
    }
    userStat.set(stat.role.xf.name, xfCount + 1);

    xinfaStatsMap.set(stat.userId, userStat);
  }

  return xinfaStatsMap;
};

function transformMembers(
  items: TeamMember[],
  stats: TeamMemberStats[]
): TeamMemberOut[] {
  const getPlayDurationText = (item: TeamMember) => {
    return `${item.playDuration}分钟`;
  };

  const pigeonTotalStatsMap = getPigeonTotalStatsMap(stats);
  const getPigeonTotalText = (item: TeamMember): string | null => {
    const stat = pigeonTotalStatsMap.get(item.userId);
    let text = null;
    if (stat !== undefined) {
      text = `${stat.total}（总）/${stat.isPigeon}（鸽）`;
    }
    return text;
  };

  const pigeonTimeStatsMap = getPigeonTimeStatsMap(stats);
  const getPigeonTimeStatsArr = (item: TeamMember): StatItem[] => {
    let stats = pigeonTimeStatsMap.get(item.userId);
    if (stats === undefined) {
      stats = [];
    }

    const statsArr: StatItem[] = [];
    stats.forEach((stat, index) => {
      console.log(
        `JSON.stringify(stat)=${JSON.stringify(stat)},index=${index};`
      );

      if (stat.total > 0) {
        statsArr.push({
          label: weekDayFormat(index),
          value: `${stat.total}（总）/${stat.isPigeon}（鸽）`,
        });
      }
    });

    return statsArr;
  };

  const xinfaStatsMap = getXinfaStatsMap(stats);
  const getXinfaStatsArr = (item: TeamMember): StatItem[] => {
    let statMap = xinfaStatsMap.get(item.userId);
    if (statMap === undefined) {
      statMap = new Map();
    }

    const statsArr: StatItem[] = [];
    statMap.forEach((value, key) => {
      statsArr.push({ label: key, value: `${value}次` });
    });

    return statsArr;
  };

  const tItems = [];
  for (const item of items) {
    tItems.push({
      id: item.id,
      userId: item.userId,
      avatar: item.role.xf.icon,
      name: item.role.xf.name,
      currentScore: item.currentScore,
      maxScore: item.maxScore,
      confirmed: item.confirmed,
      playDurationText: getPlayDurationText(item),
      pigeonTotalText: getPigeonTotalText(item),
      pigeonTimeStatsArr: getPigeonTimeStatsArr(item),
      xinfaStatsArr: getXinfaStatsArr(item),
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
          playDuration: true,
          userId: true,
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

  if (item === null) {
    return item;
  }

  const userIds = item.TeamMember.map((item) => item.userId);
  const teamMemberStatsArr = await prisma.teamMember.findMany({
    select: {
      userId: true,
      isPigeon: true,
      team: {
        select: {
          startAt: true,
        },
      },
      role: {
        select: {
          xf: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  return (
    item && {
      id: item.id,
      level: countLevel(item.TeamMember),
      startAt: formatSecondTimestampToTime(item.startAt),
      startAtTs: item.startAt,
      confirmAdvancedMinutes: item.confirmAdvancedMinutes,
      clientType: item.clientType.label,
      teamType: item.type.label,
      members: transformMembers(item.TeamMember, teamMemberStatsArr),
      currentMemberCount: item.TeamMember.length,
      maxMemberCount: item.type.maxMemberCount,
    }
  );
}
