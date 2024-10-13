"use client";

import SideBar from "@/app/components/sideBar";
import { HomeMain } from "./components/homeMain";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeMain />
      <SideBar />
    </Box>
  );
}
