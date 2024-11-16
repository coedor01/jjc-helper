"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { getXfIcon } from "@/utils/jx3";
import { TypedClientSocket } from "@/socket";
import { TeamType, ClientType, UserGameRole } from "@/socket/types";

interface Props {
  socket: TypedClientSocket;
  teamTypes: TeamType[];
  clientTypes: ClientType[];
  userGameRole: UserGameRole;
  isMatching: boolean;
}

export default function Body({
  socket,
  teamTypes,
  clientTypes,
  userGameRole,
  isMatching,
}: Props) {
  const [type, setType] = useState<"CREATE" | "JOIN" | "MATCH">("MATCH");
  const [teamTypeId, setTeamTypeId] = useState<number>(1);
  const [clientTypeId, setClientTypeId] = useState<number>(1);
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="fixed top-10 bottom-20 left-5 right-5 flex flex-col items-center justify-start">
      <div className="w-96 flex flex-col items-center justify-start gap-4">
        <div className="relative w-72 h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
          <div className="avatar size-12 w-14">
            <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
              <img src={getXfIcon(userGameRole.gameRole.kungfuId)} />
            </div>
          </div>
          <div className="relative size-full flex flex-col">
            <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
              <span className="pl-1 ">{`${userGameRole.gameRole.roleName}·${userGameRole.gameRole.serverName}`}</span>
            </span>
            <span className="flex-1 text-sm flex items-center justify-between">
              <span className="pl-1">{`装分 ${userGameRole.gameRole.panelList.score}`}</span>
            </span>
          </div>
        </div>
        {/* <div role="tablist" className="tabs tabs-boxed bg-white">
          <a
            role="tab"
            className={clsx("tab", type === "MATCH" && "bg-sky-900 text-white")}
            onClick={() => setType("MATCH")}
          >
            匹配
          </a>
          <a
            role="tab"
            className={clsx("tab", type === "JOIN" && "bg-sky-900 text-white")}
            onClick={() => setType("JOIN")}
          >
            加入
          </a>
          {
            <a
              role="tab"
              className={clsx(
                "tab",
                type === "CREATE" && "bg-sky-900 text-white"
              )}
              onClick={() => setType("CREATE")}
            >
              创建
            </a>
          }
        </div> */}

        {type === "MATCH" && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">招募类型</span>
                </div>
                <select
                  disabled={isMatching}
                  className="select select-bordered w-full max-w-xs"
                  name="teamTypeId"
                  value={teamTypeId}
                  onChange={(e) =>
                    setTeamTypeId(Number(e.target.value) as number)
                  }
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
                  disabled={isMatching}
                  className="select select-bordered w-full max-w-xs"
                  name="clientTypeId"
                  value={clientTypeId}
                  onChange={(e) =>
                    setClientTypeId(Number(e.target.value) as number)
                  }
                >
                  {clientTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {!isMatching && (
              <button
                className="btn w-full bg-sky-900 text-white"
                onClick={() =>
                  socket.emit("$startSingleMatch", teamTypeId, clientTypeId)
                }
              >
                开始匹配
              </button>
            )}
          </div>
        )}
        {type === "JOIN" && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间号</span>
                </div>
                <input
                  disabled={isMatching}
                  type="text"
                  name="roomId"
                  placeholder="请输入房间号"
                  className="input input-bordered w-full max-w-xs"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间密码</span>
                </div>
                <input
                  disabled={isMatching}
                  type="text"
                  name="password"
                  placeholder="请输入房间密码"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button
              disabled={isMatching}
              className="btn w-full bg-sky-900 text-white "
              onClick={() => socket.emit("$joinRoom", roomId, password)}
            >
              加入房间
            </button>
          </div>
        )}
        {type === "CREATE" && (
          <div className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间密码</span>
                </div>
                <input
                  disabled={isMatching}
                  type="text"
                  name="password"
                  placeholder="请设置房间密码"
                  className="input input-bordered w-full max-w-xs"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
            </div>
            <button
              disabled={isMatching}
              className="btn w-full bg-sky-900 text-white"
              onClick={() => socket.emit("$newRoom", newPassword)}
            >
              创建房间
            </button>
          </div>
        )}
        {isMatching && <div className="text-white">正在匹配...</div>}
        {isMatching && (
          <button
            className="btn w-full bg-sky-900 text-white "
            onClick={() => socket.emit("$cancelSingleMatch")}
          >
            取消
          </button>
        )}
      </div>
    </div>
  );
}
