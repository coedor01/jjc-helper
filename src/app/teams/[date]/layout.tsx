"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { routes } from "@/app/const";
import { ROOT_PATH } from "@/app/teams/const";
import SideBar from "@/app/components/sideBar";

export default function TeamsOfDateLayout({
  children,
  filter,
}: Readonly<{
  children: React.ReactNode;
  filter: React.ReactNode,
}>) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      {filter}
      <SideBar
        routes={routes}
        currentRoute={ROOT_PATH}
      />
    </ThemeProvider>
  );
}
