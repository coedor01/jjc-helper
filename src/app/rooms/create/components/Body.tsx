"use client";

import { useRouter } from "next/navigation";

export default function Body() {
  const router = useRouter();
  return (
    <div className="fixed top-10 bottom-20 left-5 right-5 flex flex-col items-center justify-center gap-4">
      <div role="tablist" className="tabs tabs-boxed">
        <a
          role="tab"
          className="tab"
          onClick={() => router.push("/rooms/join")}
        >
          加入
        </a>
        <a role="tab" className="tab bg-sky-900 text-white">
          创建
        </a>
        <a
          role="tab"
          className="tab"
          onClick={() => router.push("/rooms/match")}
        >
          匹配
        </a>
      </div>
      <div className="w-full max-h-96 h-fit bg-sky-50 rounded-md overflow-y-auto overscroll-contain inline-flex flex-col items-center justify-center pl-4 pr-4 pt-8 pb-8">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">服务器</span>
          </div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              请选择服务器
            </option>
            <option>唯我独尊</option>
            <option>乾坤一掷</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">游戏昵称</span>
          </div>
          <input
            type="text"
            placeholder="请输入游戏昵称"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">招募类型</span>
          </div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              请选择招募类型
            </option>
            <option>名剑大会三对三</option>
            <option>名剑大会五对五</option>
            <option>绝境战场</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">客户端</span>
          </div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              请选择客户端
            </option>
            <option>旗舰端</option>
            <option>无界端</option>
          </select>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">房间密码</span>
          </div>
          <input
            type="text"
            placeholder="请设置房间密码"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>

      <button className="btn w-full bg-sky-900 text-white ">确认角色</button>
      <button className="btn w-full bg-sky-900 text-white ">创建房间</button>
    </div>
  );
}
