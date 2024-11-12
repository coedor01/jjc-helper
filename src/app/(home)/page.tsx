"use client";

import {
  socket,
  服务端事件,
  状态变动结构体,
  静态数据变动结构体,
  房间中_房间信息结构体,
  房间中_人员变动结构体,
  状态类型,
  房间状态类型,
  房间中_房间状态变更结构体,
  服务器,
  招募类型,
  客户端类型,
  角色信息,
} from "@/socket";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Room from "./components/Room";
import SetRole from "./components/SetRole";

export default function RoomMatchingPage() {
  const [status, setStatus] = useState<状态类型 | null>(null);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [servers, setServers] = useState<服务器[] | null>(null);
  const [teamTypes, setTeamTypes] = useState<招募类型[] | null>(null);
  const [clientTypes, setClientTypes] = useState<客户端类型[] | null>(null);
  const [myGameRole, setMyGameRole] = useState<角色信息 | null>(null);
  const [roomMembers, setRoomMembers] = useState<角色信息[]>([]);
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);
  const [roomStatus, setRoomStatus] = useState<房间状态类型>("匹配中");

  useEffect(() => {
    socket.on("connect", () => console.log("SocketIO 连接成功"));
    socket.on("disconnect", () => console.log("SocketIO 已断开"));
    socket.on(服务端事件.角色信息变动, (msg) => {
      setMyGameRole(msg);
    });
    socket.on(服务端事件.状态变动, (msg: 状态变动结构体) => {
      setStatus(msg.状态);
      setIsMatching(msg.是否正在匹配);
    });
    socket.on(服务端事件.静态数据变动, (msg: 静态数据变动结构体) => {
      setServers(msg.服务器);
      setTeamTypes(msg.招募类型);
      setClientTypes(msg.客户端类型);
    });
    socket.on(服务端事件.房间中_房间信息, (msg: 房间中_房间信息结构体) => {
      setRoomId(msg.房间ID);
      setRoomMembers(msg.成员);
      setIsRoomOwner(msg.是否房主);
      setRoomStatus(msg.状态);
    });
    socket.on(服务端事件.房间中_人员变动, (msg: 房间中_人员变动结构体) => {
      setRoomMembers(msg.成员);
    });
    socket.on(
      服务端事件.房间中_房间状态变更,
      (msg: 房间中_房间状态变更结构体) => {
        setRoomStatus(msg.状态);
      }
    );
    socket.on(服务端事件.匹配中_有人确认, (msg) => {});
    socket.on(服务端事件.队伍中_新消息, (msg) => {});

    return () => {
      socket.off();
    };
  }, []);

  return (
    <>
      {status === null && <div>加载中...</div>}
      {status === "选择角色" && <SetRole servers={servers} />}
      {status === "首页" && (
        <Home
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          gameRole={myGameRole}
          isMatching={isMatching}
        />
      )}
      {status === "房间中" && (
        <Room
          id={roomId}
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          members={roomMembers}
          isOwner={isRoomOwner}
          roomStatus={roomStatus}
        />
      )}
    </>
  );
}
