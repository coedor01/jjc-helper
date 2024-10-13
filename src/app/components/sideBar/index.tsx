"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "./const";
import { Paper, SxProps, Theme } from "@mui/material";

export default function SideBar(sx?: SxProps<Theme>) {
  const [value, setValue] = React.useState("/");
  const pathname = usePathname(); // 使用 usePathname 获取当前路径
  const router = useRouter();

  React.useEffect(() => {
    setValue(pathname); // 在每次路径变化时更新值
    console.debug(`跳转至${pathname}`);
  }, [pathname]); // 依赖路径变化

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        ...sx,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
      >
        {routes.map((item) => (
          <BottomNavigationAction
            key={item.href}
            value={item.href}
            label={item.label}
            sx={{ maxWidth: "none" }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
