"use client";

import { SessionProvider } from "next-auth/react";
import { routes } from "@/app/const";
import SideBar from "@/app/components/sideBar";
import Profile from "./components/Profile";

export default function Me() {
  return (
    <>
      <SessionProvider>
        <Profile />
      </SessionProvider>
      <SideBar routes={routes} currentRoute="/me" />
    </>
  );
}
