"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { CurrentStatusData, StatusType } from "./types";

export default function RoomMatchingPage() {
  const [status, setStatus] = useState<StatusType | null>(null);

  useEffect(() => {
    function onConnect() {
      console.log("连上了");
    }

    function onDisconnect() {
      console.log("断开了");
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

  // const myRoom = await getMyRoom();

  return (
    <>
      {status === null && <div>加载中...</div>}
      {/* {status === "NULL" && (
        <Home
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          gameRole={gameRole}
          myRoom={myRoom}
        />
      )} */}
    </>
  );
}
