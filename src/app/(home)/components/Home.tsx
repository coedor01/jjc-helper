"use client";

import clsx from "clsx";
import { useState } from "react";
import { createRoom, joinRoom, startMatching } from "../actions";
import { getXfIcon } from "@/utils/jx3";
import {
  TeamType,
  ClientType,
  GameRole,
  TypedClientSocket,
} from "@/socket/types";

interface Props {
  socket: TypedClientSocket;
  teamTypes: TeamType[] | null;
  clientTypes: ClientType[] | null;
  gameRole: GameRole | null;
  isMatching: boolean;
}

export default function Body({
  socket,
  teamTypes,
  clientTypes,
  gameRole,
  isMatching,
}: Props) {
  if (!teamTypes || !clientTypes || !gameRole) {
    return <>加载中</>;
  }

  const [type, setType] = useState<"CREATE" | "JOIN" | "MATCH">("MATCH");

  return (
    <div className="fixed top-10 bottom-20 left-5 right-5 flex flex-col items-center justify-start">
      <div className="w-96 flex flex-col items-center justify-start gap-4">
        <div className="relative w-72 h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
          <div className="avatar size-12 w-14">
            <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
              <img src={getXfIcon(gameRole.kungfuId)} />
            </div>
          </div>
          <div className="relative size-full flex flex-col">
            <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
              <span className="pl-1 ">{`${gameRole.roleName}·${gameRole.serverName}`}</span>
            </span>
            <span className="flex-1 text-sm flex items-center justify-between">
              <span className="pl-1">{`装分 ${gameRole.panelList.score}`}</span>
            </span>
          </div>
        </div>
        <div role="tablist" className="tabs tabs-boxed bg-white">
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
        </div>

        {type === "MATCH" && (
          <form action={startMatching} className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">招募类型</span>
                </div>
                <select
                  disabled={isMatching}
                  className="select select-bordered w-full max-w-xs"
                  name="teamTypeId"
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
                type="submit"
                className="btn w-full bg-sky-900 text-white "
              >
                开始匹配
              </button>
            )}
          </form>
        )}
        {type === "JOIN" && (
          <form action={joinRoom} className="w-full flex flex-col gap-4">
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
                />
              </label>
            </div>
            {!isMatching && (
              <button
                type="submit"
                className="btn w-full bg-sky-900 text-white "
              >
                加入房间
              </button>
            )}
          </form>
        )}
        {type === "CREATE" && (
          <form action={createRoom} className="w-full flex flex-col gap-4">
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
                />
              </label>
            </div>
            {!isMatching && (
              <button
                disabled={isMatching}
                type="submit"
                className="btn w-full bg-sky-900 text-white"
              >
                创建房间
              </button>
            )}
          </form>
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
