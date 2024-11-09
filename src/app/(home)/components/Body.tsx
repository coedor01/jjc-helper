"use client";

import clsx from "clsx";
import { FormEvent, useState } from "react";
import { TeamType, ClientType, GameRole } from "@/app/types";
import { createRoom } from "../actions";

function getXfIcon(kungfuId: string) {
  return `/image/xf/${kungfuId}.png`;
}

interface Props {
  teamTypes: TeamType[];
  clientTypes: ClientType[];
  gameRole: GameRole;
}

export default function Body({ teamTypes, clientTypes, gameRole }: Props) {
  const createRoomWithGameRole = createRoom.bind(null, gameRole);

  const [type, setType] = useState<"CREATE" | "JOIN" | "MATCH">("MATCH");

  async function handleJoinRooms(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 房间号OrNull = formData.get("房间号") as string;
    const 房间密码OrNull = formData.get("房间密码") as string;
    console.log(`房间号=${房间号OrNull}`);
    console.log(`房间密码=${房间密码OrNull}`);
  }

  async function handleMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 招募类型IDOrNull = Number(formData.get("招募类型")) as number;
    const 客户端IDOrNull = Number(formData.get("客户端")) as number;
    console.log(`招募类型ID=${招募类型IDOrNull}`);
    console.log(`客户端ID=${客户端IDOrNull}`);
  }

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
        </div>

        {type === "CREATE" && (
          <form
            action={createRoomWithGameRole}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间密码</span>
                </div>
                <input
                  type="text"
                  name="password"
                  placeholder="请设置房间密码"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button type="submit" className="btn w-full bg-sky-900 text-white">
              创建房间
            </button>
          </form>
        )}
        {type === "JOIN" && (
          <form
            onSubmit={handleJoinRooms}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间号</span>
                </div>
                <input
                  type="text"
                  name="房间号"
                  placeholder="请输入房间号"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间密码</span>
                </div>
                <input
                  type="text"
                  name="房间密码"
                  placeholder="请输入房间密码"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button type="submit" className="btn w-full bg-sky-900 text-white ">
              加入房间
            </button>
          </form>
        )}
        {type === "MATCH" && (
          <form onSubmit={handleMatch} className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">招募类型</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="招募类型"
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
                  name="客户端"
                >
                  {clientTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="btn w-full bg-sky-900 text-white ">
              开始匹配
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
