import { Box, Typography, Grid2, Avatar } from "@mui/material";
import React from "react";

interface Member {
  avatar: string;
}

interface Team {
  clientType: string;
  teamType: string;
  level: string;
  startAt: string;
  members: Member[];
  maxMemberCount: number;
  currentMemberCount: number;
}

interface TeamItemProps {
  item: Team;
}

const TeamItem: React.FC<TeamItemProps> = ({ item }) => {
  console.log(`item=${item}`);

  return (
    <Box
      sx={{
        backgroundColor: "white", // 白色背景
        width: "100%", // 宽度占满父容器
        m: 0.1,
      }}
    >
      <Grid2
        container
        sx={{
          padding: "1px 5px",
        }}
      >
        <Grid2
          size={3}
          sx={{
            fontSize: 12,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "gray",
            }}
          >
            {item.clientType}
          </Typography>
        </Grid2>
        <Grid2
          size={6}
          sx={{
            textAlign: "center",
            fontSize: 12,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "gray",
            }}
          >
            {item.teamType}
          </Typography>
        </Grid2>
        <Grid2
          size={3}
          sx={{
            textAlign: "right",
            fontSize: 12,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "gray",
            }}
          >
            {item.level}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2
        container
        sx={{
          padding: "0px 5px 5px 5px",
          display: "flex",
          alignItems: "center", // 垂直居中
        }}
      >
        <Grid2 size={3}>
          <Typography variant="subtitle1">{item.startAt}</Typography>
        </Grid2>
        <Grid2
          size={6}
          sx={{
            display: "flex",
            justifyContent: "center", // 水平居中
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {item.members.map((item, index) => (
              <Avatar
                key={index}
                src={item.avatar}
                sx={{ width: 32, height: 32 }}
              />
            ))}
          </Box>
        </Grid2>
        <Grid2
          size={3}
          sx={{
            textAlign: "right",
          }}
        >
          {item.maxMemberCount === item.currentMemberCount ? (
            <Typography variant="subtitle1" sx={{ color: "red" }}>
              满员
            </Typography>
          ) : (
            <Typography variant="subtitle1" sx={{ color: "green" }}>
              {`缺${item.maxMemberCount - item.currentMemberCount}位`}
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

const TeamItems: React.FC = () => {
  const items: Team[] = [
    {
      clientType: "旗舰",
      teamType: "名剑大会2对2",
      level: "13段",
      startAt: "18:00",
      members: [{ avatar: "https://img.jx3box.com/image/xf/10026.png" }],
      maxMemberCount: 2,
      currentMemberCount: 1,
    },
    {
      clientType: "旗舰",
      teamType: "名剑大会3对3",
      level: "12段",
      startAt: "19:00",
      members: [
        { avatar: "https://img.jx3box.com/image/xf/10026.png" },
        { avatar: "https://img.jx3box.com/image/xf/10144.png" },
        { avatar: "https://img.jx3box.com/image/xf/10080.png" },
      ],
      maxMemberCount: 3,
      currentMemberCount: 3,
    },
    {
      clientType: "旗舰",
      teamType: "名剑大会5对5",
      level: "10段",
      startAt: "20:00",
      members: [
        { avatar: "https://img.jx3box.com/image/xf/10026.png" },
        { avatar: "https://img.jx3box.com/image/xf/10144.png" },
        { avatar: "https://img.jx3box.com/image/xf/10144.png" },
        { avatar: "https://img.jx3box.com/image/xf/10080.png" },
        { avatar: "https://img.jx3box.com/image/xf/10080.png" },
      ],
      maxMemberCount: 5,
      currentMemberCount: 5,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "grey.100", // 灰色背景
        width: "100vw", // 充满视窗的宽度
        height: "100vh", // 充满视窗的高度
        display: "flex", // 使用 flex 布局（可选）
        flexDirection: "column",
        justifyContent: "center", // 居中对齐（可选）
        alignItems: "center", // 垂直居中（可选）
      }}
    >
      {items.map((item, index) => (
        <TeamItem key={index} item={item} />
      ))}
    </Box>
  );
};

export default TeamItems;
