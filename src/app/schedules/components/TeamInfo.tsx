"use client";

import { Box, Typography, Grid2, Avatar, SxProps, Theme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { ROOT_PATH } from "../const";
import { MyTeam } from "@/app/core/v1/schemas";

interface TeamItemProps {
  item: MyTeam;
}

const TeamItem: React.FC<TeamItemProps> = ({ item }) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/teams/${id}`);
  };
  return (
    <Box
      onClick={() => handleClick(item.id)}
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
          <Typography variant="subtitle1">{item.startAtText}</Typography>
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

interface Props {
  items: MyTeam[];
  sx?: SxProps<Theme>;
}

const TeamInfo: React.FC<Props> = ({ items, sx }) => {
  return (
    <Box
      sx={{
        width: "100vw", // 充满视窗的宽度
        display: "flex", // 使用 flex 布局（可选）
        flexDirection: "column",
        ...sx,
      }}
    >
      {items.map((item, index) => (
        <TeamItem key={index} item={item} />
      ))}
    </Box>
  );
};

export default TeamInfo;
