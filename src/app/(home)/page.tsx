"use client";

import Cookies from "js-cookie";
import { createSocket, TypedClientSocket } from "@/socket";
import {
  TeamType,
  ClientType,
  UserStatus,
  UserGameRole,
  defaultUserGameRole,
  MatchingUserGameRole,
} from "@/socket/types";
import { useEffect, useState, Suspense, useDeferredValue } from "react";
import Home from "./components/Home";
import Room from "./components/Room";
import Matching from "./components/Matching";

export default function RoomMatchingPage() {
  const fingerprint = Cookies.get("fingerprint");
  const server = Cookies.get("server");
  const name = Cookies.get("name");

  const [currentSocket, setCurrentSocket] = useState<TypedClientSocket | null>(
    null
  );
  const [userId, setUserId] = useState<string>("");
  const deferredUserId = useDeferredValue(userId);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [teamTypes, setTeamTypes] = useState<TeamType[]>([]);
  const deferredTeamTypes = useDeferredValue(teamTypes);
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const deferredClientTypes = useDeferredValue(clientTypes);
  const [myUserGameRole, setMyUserGameRole] =
    useState<UserGameRole>(defaultUserGameRole);
  const deferredMyGameRole = useDeferredValue(myUserGameRole);
  const [roomId, setRoomId] = useState<string>("");
  const deferredRoomId = useDeferredValue(roomId);
  const [roomMembers, setRoomMembers] = useState<UserGameRole[]>([]);
  const deferredRoomMembers = useDeferredValue(roomMembers);
  const [roomOwner, setRoomOwner] = useState<string>("");
  const deferredRoomOwner = useDeferredValue(roomOwner);
  const [roomIsMatching, setRoomIsMatching] = useState<boolean>(false);
  const deferredRoomIsMatching = useDeferredValue(roomIsMatching);

  const [matchingClientType, setMatchingClientType] = useState<string>("");
  const deferredClientType = useDeferredValue(matchingClientType);
  const [matchingTeamType, setMatchingTeamType] = useState<string>("");
  const deferredTeamType = useDeferredValue(matchingTeamType);
  const [matchingMates, setMatchingMates] = useState<MatchingUserGameRole[]>(
    []
  );
  const deferredMates = useDeferredValue(matchingMates);
  const [isMatchingReady, setIsMatchingReady] = useState<boolean>(false);
  const deferredIsMatchingReady = useDeferredValue(isMatchingReady);
  const [matchingTick, setMatchingTick] = useState<number>(60);

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
        setUserId(data._id);
        setUserStatus(data.status);
        setIsMatching(data.isMatching);
        setIsMatchingReady(data.isMatchingReady);
      });
      socket.on("$roleInfo", (data) => {
        setMyUserGameRole(data);
      });
      socket.on("$staticData", (teamTypes, clientTypes) => {
        setTeamTypes(teamTypes);
        setClientTypes(clientTypes);
      });
      socket.on("$roomInfo", (_id, members, owner, isMatching) => {
        setRoomId(_id);
        setRoomMembers(members);
        setRoomOwner(owner);
        setRoomIsMatching(isMatching);
      });
      socket.on("$roomMembers", (members) => {
        setRoomMembers(members);
      });
      socket.on("$matchingInfo", (data) => {
        setMatchingClientType(data.clientType);
        setMatchingTeamType(data.teamType);
        setMatchingMates(data.mates);
      });
      socket.on("$matchingCountdown", (tick) => {
        setMatchingTick(tick);
      });

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
        <Suspense fallback={<div>Loading!</div>}>
          <Home
            socket={currentSocket}
            teamTypes={deferredTeamTypes}
            clientTypes={deferredClientTypes}
            userGameRole={deferredMyGameRole}
            isMatching={isMatching}
          />
        </Suspense>
      )}
      {currentSocket && userStatus === "AtRoom" && (
        <Suspense fallback={<div>Loading!</div>}>
          <Room
            socket={currentSocket}
            id={deferredRoomId}
            teamTypes={deferredTeamTypes}
            clientTypes={deferredClientTypes}
            members={deferredRoomMembers}
            owner={deferredRoomOwner}
            roomIsMatching={deferredRoomIsMatching}
            userId={deferredUserId}
          />
        </Suspense>
      )}
      {currentSocket && userStatus == "AtMatching" && (
        <Suspense fallback={<div>Loading!</div>}>
          <Matching
            clientType={deferredClientType}
            teamType={deferredTeamType}
            mates={deferredMates}
            isReady={deferredIsMatchingReady}
            userId={deferredUserId}
            socket={currentSocket}
            matchingTick={matchingTick}
          />
        </Suspense>
      )}
    </>
  );
}
