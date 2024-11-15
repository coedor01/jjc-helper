"use client";
import { TypedClientSocket } from "@/socket";
import { TeamType, ClientType, UserGameRole } from "@/socket/types";
import { getXfIcon } from "@/utils/jx3";
import { useState } from "react";

interface Props {
  id: string;
  teamTypes: TeamType[];
  clientTypes: ClientType[];
  members: UserGameRole[];
  owner: string;
  roomIsMatching: boolean;
  socket: TypedClientSocket;
  userId: string;
}

export default function Room({
  id,
  teamTypes,
  clientTypes,
  members,
  owner,
  roomIsMatching,
  socket,
  userId,
}: Props) {
  const [teamTypeId, setTeamTypeId] = useState("1");
  const [clientTypeId, setClientTypeId] = useState("1");

  return (
    <div className="fixed top-0 bottom-0 w-full flex justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-xl text-white tracking-wider">房间号</div>
          <div className="text-3xl text-white tracking-widest outline-double outline-white p-3 rounded-md">
            {id}
          </div>
        </div>
        <div className="w-full min-h-32 h-fit flex flex-col justify-center items-center gap-2 pl-2 pr-2">
          {members.map((item, index) => (
            <div className="relative w-72 h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
              <div className="avatar size-12 w-14">
                <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
                  <img src={getXfIcon(item.gameRole.kungfuId)} />
                </div>
              </div>
              <div className="relative size-full flex flex-col">
                <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
                  <span className="pl-1 ">{`${item.gameRole.roleName}·${item.gameRole.serverName}`}</span>
                  {owner === item.userId && (
                    <span className="pr-1 text-white">房主</span>
                  )}
                </span>
                <span className="flex-1 text-sm flex items-center justify-between">
                  <span className="pl-1">{`装分 ${item.gameRole.panelList.score}`}</span>
                  {userId === item.userId && <span className="pr-1 ">我</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
        {userId === owner && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">招募类型</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="teamTypeId"
                  disabled={roomIsMatching}
                  value={teamTypeId}
                  onChange={(e) => setTeamTypeId(e.target.value)}
                >
                  {teamTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">客户端</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="clientTypeId"
                  disabled={roomIsMatching}
                  value={clientTypeId}
                  onChange={(e) => setClientTypeId(e.target.value)}
                >
                  {clientTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {!roomIsMatching && (
              <button
                className="btn w-full bg-sky-50 text-sky-900  animate-pulse"
                onClick={() =>
                  socket.emit("$startRoomMatch", teamTypeId, clientTypeId)
                }
              >
                开始匹配
              </button>
            )}
          </div>
        )}
        {!roomIsMatching && userId !== owner && (
          <div className="text-white">等待房主开始</div>
        )}
        {roomIsMatching && <div className="text-white">正在匹配...</div>}
        {roomIsMatching && userId === owner && (
          <button
            className="btn w-full bg-sky-900 text-white "
            onClick={() => socket.emit("$cacnelRoomMatch")}
          >
            取消
          </button>
        )}
        {!roomIsMatching && (
          <button
            className="btn w-full bg-sky-900 text-white "
            onClick={() => socket.emit("$exitRoom")}
          >
            退出房间
          </button>
        )}
      </div>
    </div>
  );
}
