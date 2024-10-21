"use client";

import NavBar from "@/app/components/navBar";
import { Box, Grid2, Typography } from "@mui/material";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function DeviceInfoItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) {
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
          p: 2,
        }}
      >
        <Grid2 size={2}>
          <Typography variant="body2">{label}：</Typography>
        </Grid2>
        <Grid2 size={10}>
          <Typography variant="body2">{value}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}

function DeviecInfoList() {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24小时制
      });
      setCurrentTime(formattedTime);
    };

    updateTime(); // 初始调用以显示当前时间
    const intervalId = setInterval(updateTime, 1000); // 每秒更新

    return () => clearInterval(intervalId); // 清除定时器
  }, []);

  const version = localStorage.getItem("publicVersion");

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: 1,
        flexDirection: "column",
      }}
    >
      <DeviceInfoItem label="UID" value={user?.uid} />
      <DeviceInfoItem label="端口" value="H5" />
      <DeviceInfoItem label="时间" value={currentTime} />
      <DeviceInfoItem label="版本" value={version} />
    </Box>
  );
}

const DeviceInfo: React.FC = () => {
  return (
    <>
      <NavBar title="设备信息" />
      <SessionProvider>
        <DeviecInfoList />
      </SessionProvider>
    </>
  );
};

export default DeviceInfo;
