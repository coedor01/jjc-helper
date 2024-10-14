"use client";

import SideBar from "@/app/components/sideBar";
import { HomeMain } from "./components/homeMain";
import { Box, Fab } from "@mui/material";
import { routes } from "../const";

export default function Home() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeMain />
      <SideBar
        routes={routes}
        currentRoute="/home"
      />
    </Box>
  );
}
