"use client";

import { TypedClientSocket } from "@/socket";
import { MatchingUserGameRole } from "@/socket/types";

interface Props {
  clientType: string;
  teamType: string;
  mates: MatchingUserGameRole[];
  isReady: boolean;
  userId: string;
  socket: TypedClientSocket;
  matchingTick: number;
}

export default function Matching({
  clientType,
  teamType,
  mates,
  isReady,
  userId,
  socket,
  matchingTick,
}: Props) {
  return (
    <div className="fixed top-0 bottom-0 w-full flex flex-col justify-center items-center gap-6">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-xl text-white tracking-wider">{`[${clientType}]${teamType}`}</div>
        <div className="text-3xl tracking-widest outline-double outline-amber-300 p-3 rounded-md text-amber-300">
          匹配成功 {String(matchingTick).padStart(2, "0")}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center gap-2 pl-2 pr-2">
        {mates.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1"
          >
            <div className="avatar size-12 w-14">
              <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
                <img src="/image/xf/10028.png" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
                <span className="pl-1 ">{`${item.gameRole.roleName}·${item.gameRole.serverName}`}</span>
                <span className="pr-1 flex gap-1">
                  {item.userId === userId && (
                    <span className="text-amber-300 font-semibold">[我]</span>
                  )}
                  <span className=" text-white">{`${item.jjcPerf.grade}段`}</span>
                </span>
              </span>
              <span className="text-sm flex flex-row-reverse items-center justify-between">
                <span className="pr-1">{`胜率${item.jjcPerf.winRate}% | 胜场${item.jjcPerf.winCount}`}</span>
                {item.isReady && (
                  <span className="pl-1 text-red-500">已准备</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      {!isReady && (
        <div className="flex flex-col w-full gap-1 p-1">
          <button
            className="btn w-full animate-pulse	text-sky-900 text-2xl"
            onClick={() => socket.emit("$acceptMatching")}
          >
            准备
          </button>
          <button
            className="btn w-full bg-sky-900 text-white text-2xl"
            onClick={() => socket.emit("$rejectMatching")}
          >
            取消准备
          </button>
        </div>
      )}
      {isReady && <div>等待其他人准备...</div>}
      <div className="flex ustify-center items-center"></div>
    </div>
  );
}
