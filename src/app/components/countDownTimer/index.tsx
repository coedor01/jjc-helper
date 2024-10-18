"use client";

import React, { useState, useEffect } from "react";
import { Typography, Box, SxProps, Theme } from "@mui/material";

interface Props {
  targetTimestamp: number; // 目标日期时间戳
  sx?: SxProps<Theme>;
}

const CountdownTimer: React.FC<Props> = ({ targetTimestamp, sx }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 计算倒计时
  const calculateTimeLeft = () => {
    const now = Date.now(); // 当前时间的毫秒级时间戳
    const targetTime = targetTimestamp * 1000; // 将秒级时间戳转为毫秒
    const difference = targetTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  useEffect(() => {
    calculateTimeLeft(); // 初始化时计算一次

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // 每秒更新一次倒计时

    return () => clearInterval(timer); // 清除定时器
  }, [targetTimestamp]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: timeLeft.days === 0 ? "none" : "inline-flex",
        }}
      >
        {timeLeft.days}天
      </Typography>
      <Typography variant="h6">{timeLeft.hours}小时</Typography>
      <Typography variant="h6">{timeLeft.minutes}分</Typography>
      <Typography
        variant="h6"
        sx={{
          display: timeLeft.days === 0 ? "inline-flex" : "none",
        }}
      >
        {timeLeft.seconds}秒
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
