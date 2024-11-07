"use client";

import Body from "./components/Body";
import useStaticDatas from "@/hooks/useStaticDatas";

export default function RoomWatingPage() {
  const { teamTypes, clientTypes } = useStaticDatas();
  return (
    <>
      <Body teamTypes={teamTypes} clientTypes={clientTypes} />
    </>
  );
}
