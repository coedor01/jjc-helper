"use client";

import { Box } from "@mui/material";
import SideBar from "@/app/components/sideBar";
import { routes } from "@/app/const";
import { ROOT_PATH } from "../const";

export default function TeamsOfDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
      <SideBar
        routes={routes}
        currentRoute={ROOT_PATH}
      />
    </Box>
  );
}
