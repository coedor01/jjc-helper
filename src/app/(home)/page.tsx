"use client";

import { socket, $鉴权, 服务端事件, 当前状态结构体, 状态类型 } from "@/socket";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Room from "./components/Room";

export default function RoomMatchingPage() {
  const [status, setStatus] = useState<状态类型 | null>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    function onConnect() {
      $鉴权({
        server: localStorage.getItem("server"),
        name: localStorage.getItem("name"),
      });
      console.log("SocketIO 连接成功");
    }

    function onDisconnect() {
      console.log("SocketIO 已断开");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(服务端事件.当前状态, (msg: 当前状态结构体) => {
      setStatus(msg.状态);
      setData(msg.数据);
    });
    socket.on(服务端事件.房间中_人员变动, (msg) => {});
    socket.on(服务端事件.匹配中_有人确认, (msg) => {});
    socket.on(服务端事件.队伍中_新消息, (msg) => {});

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(服务端事件.当前状态);
      socket.off(服务端事件.房间中_人员变动);
      socket.off(服务端事件.匹配中_有人确认);
      socket.off(服务端事件.队伍中_新消息);
    };
  }, []);

  return (
    <>
      {status === null && <div>加载中...</div>}
      {status === "首页" && <Home data={data} />}
      {status === "房间中" && <Room data={data} />}
    </>
  );
}
