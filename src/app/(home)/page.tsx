"use client";
import Cookies from "js-cookie";
import { createSocket, TypedClientSocket } from "@/socket";
import {
  Server,
  TeamType,
  ClientType,
  UserStatus,
  GameRole,
} from "@/socket/types";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Room from "./components/Room";
import { getFingerprint } from "@/utils/client";

export default function RoomMatchingPage() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const server = Cookies.get("server");
  const name = Cookies.get("name");

  // 页面初始化执行
  useEffect(() => {
    // 获取 fingerprint
    const fetchFingerprint = async () => {
      const fp = await getFingerprint();
      setFingerprint(fp); // 设置 fingerprint
    };

    fetchFingerprint();
  }, []);

  const [currentSocket, setCurrentSocket] = useState<TypedClientSocket | null>(
    null
  );
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [teamTypes, setTeamTypes] = useState<TeamType[] | null>(null);
  const [clientTypes, setClientTypes] = useState<ClientType[] | null>(null);
  const [myGameRole, setMyGameRole] = useState<GameRole | null>(null);

  // 指纹，服务器，昵称更改后执行
  useEffect(() => {
    if (fingerprint && server && name) {
      const socket = createSocket(fingerprint, server, name);

      socket.on("connect", () => {
        console.log("SocketIO 连接成功");
      });
      socket.on("disconnect", () => {
        console.log("SocketIO 已断开");
      });
      socket.on("$userStatus", (data) => {
        setUserStatus(data.status);
        setIsMatching(data.isMatching);
      });
      socket.on("$roleInfo", (data) => {
        setMyGameRole(data);
      });
      socket.on("$staticData", (teamTypes, clientTypes) => {
        setTeamTypes(teamTypes);
        setClientTypes(clientTypes);
      });
      // socket.on("$roomInfo", (_id, members, isOwner, isMatching) => {
      //   setRoomId(_id);
      //   setRoomMembers(members);
      //   setIsRoomOwner(isOwner);
      //   setRoomIsMatching(isMatching);
      // });

      setCurrentSocket(socket);

      return () => {
        console.log("执行销毁函数");

        if (socket) {
          socket.disconnect();
          setCurrentSocket(null);
        }
      };
    }
  }, [fingerprint, server, name]);

  return (
    <>
      {!currentSocket && <div>加载中...</div>}
      {currentSocket && userStatus === "AtHome" && (
        <Home
          socket={currentSocket}
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          gameRole={myGameRole}
          isMatching={isMatching}
        />
      )}
      {/* {status === "房间中" && (
        <Room
          id={roomId}
          teamTypes={teamTypes}
          clientTypes={clientTypes}
          members={roomMembers}
          isOwner={isRoomOwner}
          roomStatus={roomStatus}
        />
      )} */}
    </>
  );
}
