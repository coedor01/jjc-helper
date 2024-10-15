"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { usePathname, useRouter } from "next/navigation";
import { Paper } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface Routes {
  label: string,
  href: string,
}


interface SideBarProps {
  sx?: SxProps<Theme>;
  routes: Routes[];
  currentRoute: string;
}

const SideBar: React.FC<SideBarProps> = ({ sx, routes, currentRoute }) => {
  const [value, setValue] = React.useState(currentRoute);
  const pathname = usePathname(); // 使用 usePathname 获取当前路径
  const router = useRouter();

  React.useEffect(() => {
    const rootPathname = `/${pathname.split('/')[1]}`
    setValue(rootPathname); // 在每次路径变化时更新值
    console.debug(`跳转至${pathname}，根路径${rootPathname}`);
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

export default SideBar;