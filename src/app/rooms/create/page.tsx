"use client";

import { Suspense } from "react";
import Body from "./components/Body";
import useStaticDatas from "@/hooks/useStaticDatas";

export default function RoomCreatePage() {
  const { servers, teamTypes, clientTypes } = useStaticDatas();

  return (
    <Suspense>
      <Body servers={servers} teamTypes={teamTypes} clientTypes={clientTypes} />
    </Suspense>
  );
}
