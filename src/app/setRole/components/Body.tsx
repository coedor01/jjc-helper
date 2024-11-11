"use client";

import { Server } from "@/app/types";
import { FormEvent } from "react";

interface Props {
  servers: Server[];
}

export default function Body({ servers }: Props) {
  async function handleSetRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const serverOrNull = formData.get("server") as string;
    const nameOrNull = formData.get("name") as string;
    if (!serverOrNull || !nameOrNull) {
      console.log("缺少服务器和游戏昵称");
      return;
    }
    console.log(`服务器=${serverOrNull}`);
    console.log(`游戏昵称=${nameOrNull}`);
    localStorage.setItem("server", serverOrNull);
    localStorage.setItem("name", nameOrNull);
  }

  return (
    <div className="fixed top-10 bottom-20 left-5 right-5 flex flex-col items-center justify-start">
      <div className="w-96 flex flex-col items-center justify-start gap-4">
        <>
          <span className="text-xl font-semibold text-white">
            请设置您的角色
          </span>
          <form onSubmit={handleSetRole} className="w-full flex flex-col gap-4">
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">服务器</span>
                </div>
                <select
                  name="server"
                  className="select select-bordered w-full max-w-xs"
                >
                  {servers.map((item) => (
                    <option key={item.id} value={item.name}>
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
                  name="name"
                  placeholder="请输入游戏昵称"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button type="submit" className="btn w-full bg-sky-900 text-white">
              设置角色
            </button>
          </form>
        </>
      </div>
    </div>
  );
}
