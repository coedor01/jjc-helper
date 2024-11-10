"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useSearchParams } from "next/navigation";
import { CurrentStatusData, StatusType } from "./types";
import Home from "./components/Home";
import useStaticDatas from "@/hooks/useStaticDatas";

export default function RoomMatchingPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const server = Cookies.get("server");
  const name = Cookies.get("name");
  const [status, setStatus] = useState<StatusType | null>(null);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  useEffect(() => {
    function onConnect() {
      console.log("连上了");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("断开了");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("$CurrentStatus", (msg: CurrentStatusData) => {
      setStatus(msg.status);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const { teamTypes, clientTypes } = useStaticDatas();
  const gameRole = {
    zoneName: "",
    roleName: "花间游不动",
    serverName: "唯我独尊",
    kungfuId: "10028",
    panelList: { score: 466666, panel: [] },
  };
  const myRoom = await getMyRoom();

  return (
    <>
      {status === null && <div>加载中...</div>}
      {status === "NULL" && (
        <Home
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          gameRole={gameRole}
          myRoom={myRoom}
        />
      )}
    </>
  );
}
