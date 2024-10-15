import { PrismaClient, XinFa, Server, User, TeamType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import prisma from '@/client';

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

const USER_COUNT = 100;

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
  { id: 1, name: "冰心诀", icon: "https://img.jx3box.com/image/xf/10081" },
  { id: 2, name: "云裳心经", icon: "https://img.jx3box.com/image/xf/10080" },
  { id: 3, name: "花间游", icon: "https://img.jx3box.com/image/xf/10021" },
  { id: 4, name: "离经易道", icon: "https://img.jx3box.com/image/xf/10028" },
  { id: 5, name: "毒经", icon: "https://img.jx3box.com/image/xf/10175", },
  { id: 6, name: "补天诀", icon: "https://img.jx3box.com/image/xf/10176" },
  { id: 7, name: "莫问", icon: "https://img.jx3box.com/image/xf/10447", },
  { id: 8, name: "相知", icon: "https://img.jx3box.com/image/xf/10448", },
  { id: 9, name: "无方", icon: "https://img.jx3box.com/image/xf/10627", },
  { id: 10, name: "灵素", icon: "https://img.jx3box.com/image/xf/10626", },
  { id: 11, name: "傲血战意", icon: "https://img.jx3box.com/image/xf/10026" },
  { id: 12, name: "铁牢律", icon: "https://img.jx3box.com/image/xf/10062" },
  { id: 13, name: "易筋经", icon: "https://img.jx3box.com/image/xf/10003" },
  { id: 14, name: "洗髓经", icon: "https://img.jx3box.com/image/xf/10002" },
  { id: 15, name: "焚影圣诀", icon: "https://img.jx3box.com/image/xf/10242" },
  { id: 16, name: "明尊琉璃体", icon: "https://img.jx3box.com/image/xf/10243" },
  { id: 17, name: "分山劲", icon: "https://img.jx3box.com/image/xf/10390" },
  { id: 18, name: "铁骨衣", icon: "https://img.jx3box.com/image/xf/10389" },
  { id: 19, name: "紫霞功", icon: "https://img.jx3box.com/image/xf/10014" },
  { id: 20, name: "太虚剑意", icon: "https://img.jx3box.com/image/xf/10015" },
  { id: 21, name: "天罗诡道", icon: "https://img.jx3box.com/image/xf/10225" },
  { id: 22, name: "惊羽诀", icon: "https://img.jx3box.com/image/xf/10224" },
  { id: 23, name: "问水诀", icon: "https://img.jx3box.com/image/xf/10144" },
  { id: 24, name: "山居剑意", icon: "https://img.jx3box.com/image/xf/10145" },
  { id: 25, name: "笑尘诀", icon: "https://img.jx3box.com/image/xf/10268" },
  { id: 26, name: "北傲诀", icon: "https://img.jx3box.com/image/xf/10464" },
  { id: 27, name: "凌海诀", icon: "https://img.jx3box.com/image/xf/10533" },
  { id: 28, name: "隐龙诀", icon: "https://img.jx3box.com/image/xf/10585" },
  { id: 29, name: "太玄经", icon: "https://img.jx3box.com/image/xf/10615" },
  { id: 30, name: "孤锋诀", icon: "https://img.jx3box.com/image/xf/10698" },
  { id: 31, name: "山海心诀", icon: "https://img.jx3box.com/image/xf/10756" },
  { id: 32, name: "周天功", icon: "https://img.jx3box.com/image/xf/10786" },
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
    maxMemberCount: 3,
  },
];

const TEAM_COUNT = 210;

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
  })
  return items
}

async function createUsers() {
  const datas = [];

  for (let i = 1; i < USER_COUNT + 1; i++) {
    datas.push({
      id: i,
      username: faker.internet.userName(),
      password: "123456Zz",
      name: faker.person.fullName(),
    })
  }

  await prisma.user.createMany({
    data: datas,
  })
}

async function createGameRoles() {
  const datas = [];

  for (let i = 1; i < USER_COUNT + 1; i++) {
    datas.push({
      id: i,
      name: faker.person.fullName(),
      userId: i,
      xinFaId: getRandomInt(1, XINFA_ARRAYS.length),
      serverId: getRandomInt(1, SERVER_ARRAYS.length),
    })
  }

  await prisma.gameRole.createMany({ data: datas })

}


async function createTeams() {

  const datas = [];

  for (let i = 1; i < TEAM_COUNT + 1; i++) {
    const teamTypeId = TEAM_COUNT % (TEAM_TYPE_ARRAYS.length + 1);
    const userId = TEAM_COUNT % (USER_COUNT + 1);
    datas.push({
      id: i,
      startAt: getRandomFutureHour(),
      confirmAdvancedMinutes: 30,
      userId: userId,
      teamTypeId: teamTypeId,
    });
  }

  await prisma.team.createMany({ data: datas })
}

async function createTeamMembers() {
  const datas = [];

  for (let i = 1; i < TEAM_COUNT + 1; i++) {
    const teamTypeId = TEAM_COUNT % (TEAM_TYPE_ARRAYS.length + 1);
    const userId = TEAM_COUNT % (USER_COUNT + 1);
    datas.push({
      teamId: i,
      currentScore: getRandomInt(1000, 3000),
      maxScore: getRandomInt(1000, 3000),
      playDuration: 60,
      gameRoleId: userId,
    })

    for (let j = 0; j < TEAM_TYPE_ARRAYS[teamTypeId - 1].maxMemberCount - 1; j++) {
      datas.push({
        teamId: i,
        currentScore: getRandomInt(1000, 3000),
        maxScore: getRandomInt(1000, 3000),
        playDuration: 60,
        gameRoleId: getRandomInt(1, USER_COUNT),
      })
    }
  }
  console.log(datas);


  await prisma.teamMember.createMany({ data: datas })
}

async function clearDatabase() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables};`)
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await clearDatabase();

    // 创建服务器
    await createServers();

    // 创建招募类型数据
    await createTeamTypes();

    // 创建心法数据
    await createXinFas();

    // 创建用户
    await createUsers();

    // 创建游戏角色
    await createGameRoles();

    // 从今天开始连续 7 天，在整点时间创建 210 个队伍
    await createTeams();

    // 创建队伍成员
    await createTeamMembers();

    console.log('Transaction successful, all operations completed.');
    return Response.json({ msg: "OK!" }, { status: 200 });
  } catch (error) {
    console.error('Transaction failed, rolling back changes:', error);
    return Response.json({ error }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // 断开数据库连接
  }
}