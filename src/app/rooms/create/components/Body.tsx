"use client";

import clsx from "clsx";
import { FormEvent, useState } from "react";

function getXfIcon(kungfuId: string) {
  return `/image/xf/${kungfuId}.png`;
}

interface panelList {
  score: number;
  panel: {
    name: string;
    percent: boolean;
    value: number;
  }[];
}

interface GameRole {
  zoneName: string;
  roleName: string;
  serverName: string;
  kungfuId: string;
  panelList: panelList;
}

interface Props {
  servers: Server[];
  teamTypes: TeamType[];
  clientTypes: ClientType[];
}

export default function Body({ servers, teamTypes, clientTypes }: Props) {
  const [type, setType] = useState<"CREATE" | "JOIN" | "MATCH">("MATCH");
  const [gameRole, setGameRole] = useState<GameRole | null>(null);

  async function handleSetRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 服务器IDOrNull = Number(formData.get("服务器")) as number;
    const 游戏昵称OrNull = formData.get("游戏昵称") as string;
    console.log(`服务器ID=${服务器IDOrNull}`);
    console.log(`游戏昵称=${游戏昵称OrNull}`);

    const demoRole = {
      zoneName: "",
      roleName: "花间游不动",
      serverName: "唯我独尊",
      kungfuId: "10028",
      panelList: { score: 466666, panel: [] },
    };
    setGameRole(demoRole);
  }

  async function handleCreateRooms(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 房间密码OrNull = formData.get("房间密码") as string;
    console.log(`房间密码=${房间密码OrNull}`);
  }

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
        {gameRole !== null && (
          <>
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
                className={clsx(
                  "tab",
                  type === "MATCH" && "bg-sky-900 text-white"
                )}
                onClick={() => setType("MATCH")}
              >
                匹配
              </a>
              <a
                role="tab"
                className={clsx(
                  "tab",
                  type === "JOIN" && "bg-sky-900 text-white"
                )}
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
          </>
        )}
        {gameRole === null && (
          <>
            <span className="text-xl font-semibold text-white">
              请设置您的角色
            </span>
            <form
              onSubmit={handleSetRole}
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">服务器</span>
                  </div>
                  <select
                    name="服务器"
                    className="select select-bordered w-full max-w-xs"
                  >
                    {servers.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">游戏昵称</span>
                  </div>
                  <input
                    type="text"
                    name="游戏昵称"
                    placeholder="请输入游戏昵称"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="btn w-full bg-sky-900 text-white"
              >
                设置角色
              </button>
            </form>
          </>
        )}
        {gameRole !== null && type === "CREATE" && (
          <form
            onSubmit={handleCreateRooms}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">房间密码</span>
                </div>
                <input
                  type="text"
                  name="房间密码"
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
        {gameRole !== null && type === "JOIN" && (
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
        {gameRole !== null && type === "MATCH" && (
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
