"use client";

import { Box } from "@mui/material";
import { routes } from "@/app/const";
import SideBar from "@/app/components/sideBar";
import { ROOT_PATH } from "./const";
import { redirect } from "next/navigation";
import { getDateString } from "../utils";


export default function Teams() {
  const now = new Date();
  redirect(ROOT_PATH + "/" + getDateString(now));
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <SideBar
        routes={routes}
        currentRoute={ROOT_PATH}
      />
    </Box>
  );
}
