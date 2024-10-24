import { faker } from "@faker-js/faker";
import prisma from "@/client";
import { GameRole, Team, User } from "@prisma/client";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFutureHour() {
  const now = new Date();

  // 获取当前时间的时间戳
  const currentTime = now.getTime();

  // 7 天内的毫秒数
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  // 未来 7 天的随机时间戳
  const randomTime = currentTime + Math.floor(Math.random() * sevenDays);

  // 创建新的 Date 对象，并将时间设为随机时间
  const randomDate = new Date(randomTime);

  // 将分钟和秒数设为 0，确保是整点时间
  randomDate.setMinutes(0, 0, 0);

  // 返回秒级时间戳
  return Math.floor(randomDate.getTime() / 1000);
}

const USER_COUNT = 630;

const SERVER_ARRAYS = [
  { id: 1, name: "蝶恋花" },
  { id: 2, name: "龙争虎斗" },
  { id: 3, name: "长安城" },
  { id: 4, name: "幽月轮" },
  { id: 5, name: "斗转星移" },
  { id: 6, name: "剑胆琴心" },
  { id: 7, name: "乾坤一掷" },
  { id: 8, name: "唯我独尊" },
  { id: 9, name: "梦江南" },
  { id: 10, name: "绝代天骄" },
  { id: 11, name: "天鹅坪" },
  { id: 12, name: "破阵子" },
  { id: 13, name: "飞龙在天" },
  { id: 14, name: "青梅煮酒" },
  { id: 15, name: "眉间雪" },
  { id: 16, name: "有人赴约" },
  { id: 17, name: "万象长安" },
  { id: 18, name: "山海相逢" },
];
const XINFA_ARRAYS = [
  { id: 1, name: "冰心诀", icon: "/image/xf/10081.png" },
  {
    id: 2,
    name: "云裳心经",
    icon: "/image/xf/10080.png",
  },
  { id: 3, name: "花间游", icon: "/image/xf/10021.png" },
  {
    id: 4,
    name: "离经易道",
    icon: "/image/xf/10028.png",
  },
  { id: 5, name: "毒经", icon: "/image/xf/10175.png" },
  { id: 6, name: "补天诀", icon: "/image/xf/10176.png" },
  { id: 7, name: "莫问", icon: "/image/xf/10447.png" },
  { id: 8, name: "相知", icon: "/image/xf/10448.png" },
  { id: 9, name: "无方", icon: "/image/xf/10627.png" },
  { id: 10, name: "灵素", icon: "/image/xf/10626.png" },
  {
    id: 11,
    name: "傲血战意",
    icon: "/image/xf/10026.png",
  },
  { id: 12, name: "铁牢律", icon: "/image/xf/10062.png" },
  { id: 13, name: "易筋经", icon: "/image/xf/10003.png" },
  { id: 14, name: "洗髓经", icon: "/image/xf/10002.png" },
  {
    id: 15,
    name: "焚影圣诀",
    icon: "/image/xf/10242.png",
  },
  {
    id: 16,
    name: "明尊琉璃体",
    icon: "/image/xf/10243.png",
  },
  { id: 17, name: "分山劲", icon: "/image/xf/10390.png" },
  { id: 18, name: "铁骨衣", icon: "/image/xf/10389.png" },
  { id: 19, name: "紫霞功", icon: "/image/xf/10014.png" },
  {
    id: 20,
    name: "太虚剑意",
    icon: "/image/xf/10015.png",
  },
  {
    id: 21,
    name: "天罗诡道",
    icon: "/image/xf/10225.png",
  },
  { id: 22, name: "惊羽诀", icon: "/image/xf/10224.png" },
  { id: 23, name: "问水诀", icon: "/image/xf/10144.png" },
  {
    id: 24,
    name: "山居剑意",
    icon: "/image/xf/10145.png",
  },
  { id: 25, name: "笑尘诀", icon: "/image/xf/10268.png" },
  { id: 26, name: "北傲诀", icon: "/image/xf/10464.png" },
  { id: 27, name: "凌海诀", icon: "/image/xf/10533.png" },
  { id: 28, name: "隐龙诀", icon: "/image/xf/10585.png" },
  { id: 29, name: "太玄经", icon: "/image/xf/10615.png" },
  { id: 30, name: "孤锋诀", icon: "/image/xf/10698.png" },
  {
    id: 31,
    name: "山海心诀",
    icon: "/image/xf/10756.png",
  },
  { id: 32, name: "周天功", icon: "/image/xf/10786.png" },
];
const TEAM_TYPE_ARRAYS = [
  {
    id: 1,
    label: "名剑大会2对2",
    value: "2V2",
    maxMemberCount: 2,
  },
  {
    id: 2,
    label: "名剑大会3对3",
    value: "3V3",
    maxMemberCount: 3,
  },
  {
    id: 3,
    label: "名剑大会5对5",
    value: "5V5",
    maxMemberCount: 5,
  },
];

const CLIENT_TYPE_ARRAYS = [
  { id: 1, label: "旗舰" },
  { id: 2, label: "无界" },
];

async function createClientTypes() {
  await prisma.clientType.createMany({
    data: CLIENT_TYPE_ARRAYS,
  });
}

async function createServers() {
  const items = await prisma.server.createMany({
    data: SERVER_ARRAYS,
  });
  return items;
}

async function createTeamTypes() {
  const items = await prisma.teamType.createMany({
    data: TEAM_TYPE_ARRAYS,
  });
  return items;
}

async function createXinFas() {
  const items = await prisma.xinFa.createMany({
    data: XINFA_ARRAYS,
  });
  return items;
}

async function createUsers(): Promise<User[]> {
  const datas = [];

  for (let i = 1; i < USER_COUNT + 1; i++) {
    datas.push({
      email: faker.internet.email().toLowerCase(),
      hashedPassword:
        "$2b$12$VTBw7txFafQVJ52L1P2i3ujUgPqeFp3nkSpq0kOlTu9ROBDJribWS",
    });
  }

  const items = await prisma.user.createManyAndReturn({
    data: datas,
  });

  return items;
}

async function createGameRoles(users: User[]): Promise<GameRole[]> {
  const datas = [];

  for (let i = 0; i < USER_COUNT; i++) {
    const userId = users[i].id;

    datas.push({
      name: faker.person.fullName(),
      userId: userId,
      xinFaId: getRandomInt(1, XINFA_ARRAYS.length),
      serverId: getRandomInt(1, SERVER_ARRAYS.length),
    });
  }

  const items = await prisma.gameRole.createManyAndReturn({ data: datas });
  return items;
}

async function createTeams(users: User[]): Promise<Team[]> {
  const datas = [];

  for (let i = 0; i < USER_COUNT; i++) {
    const teamTypeId = (i % TEAM_TYPE_ARRAYS.length) + 1;
    const userId = users[i].id;
    datas.push({
      id: i,
      startAt: getRandomFutureHour(),
      confirmAdvancedMinutes: 30,
      userId: userId,
      teamTypeId: teamTypeId,
      clientTypeId: getRandomInt(1, 2),
      status: getRandomInt(0, 2),
    });
  }

  const items = await prisma.team.createManyAndReturn({ data: datas });
  return items;
}

async function createTeamMembers(
  users: User[],
  gameRoles: GameRole[],
  teams: Team[]
) {
  const datas = [];

  for (let i = 0; i < USER_COUNT; i++) {
    const memberIndexArr = [i];
    const teamTypeId = (i % TEAM_TYPE_ARRAYS.length) + 1;
    const userId = users[i].id;
    const teamId = teams[i].id;
    const gameRoleId = gameRoles[i].id;

    datas.push({
      teamId: teamId,
      currentScore: getRandomInt(1000, 3000),
      maxScore: getRandomInt(1000, 3000),
      playDuration: 60,
      userId: userId,
      gameRoleId: gameRoleId,
      confirmed: Boolean(getRandomInt(0, 1)),
      isPigeon: Boolean(getRandomInt(0, 1)),
    });

    for (
      let j = 0;
      j < getRandomInt(0, TEAM_TYPE_ARRAYS[teamTypeId - 1].maxMemberCount - 1);
      j++
    ) {
      let randUserIndex = getRandomInt(1, USER_COUNT);
      if (memberIndexArr.includes(randUserIndex)) {
        randUserIndex = (randUserIndex + 1) % USER_COUNT;
      }
      memberIndexArr.push(randUserIndex);
      const memberUserId = users[randUserIndex].id;
      const memberGameRoleId = gameRoles[randUserIndex].id;

      datas.push({
        teamId: teamId,
        currentScore: getRandomInt(1000, 3000),
        maxScore: getRandomInt(1000, 3000),
        playDuration: 60,
        userId: memberUserId,
        gameRoleId: memberGameRoleId,
        confirmed: Boolean(getRandomInt(0, 1)),
        isPigeon: Boolean(getRandomInt(0, 1)),
      });
    }
  }

  await prisma.teamMember.createMany({ data: datas });
}

async function clearDatabase() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables};`);
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await clearDatabase();
    // 创建客户端数据
    await createClientTypes();

    // 创建服务器数据
    await createServers();

    // 创建招募类型数据
    await createTeamTypes();

    // 创建心法数据
    await createXinFas();

    // 创建用户
    const users = await createUsers();

    // 创建游戏角色
    const gameRoles = await createGameRoles(users);

    // 从今天开始连续 7 天，在整点时间创建 210 个队伍
    const teams = await createTeams(users);

    // 创建队伍成员
    await createTeamMembers(users, gameRoles, teams);

    console.log("Transaction successful, all operations completed.");
    return Response.json({ msg: "OK!" }, { status: 200 });
  } catch (error) {
    console.error("Transaction failed, rolling back changes:", error);
    return Response.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // 断开数据库连接
  }
}
