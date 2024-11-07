"use client";
import { FormEvent } from "react";

interface Props {
  teamTypes: TeamType[];
  clientTypes: ClientType[];
}

export default function Body({ teamTypes, clientTypes }: Props) {
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
    <div className="fixed top-0 bottom-0 w-full flex justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="text-xl text-white tracking-wider">房间号</div>
          <div className="text-3xl text-white tracking-widest outline-double outline-white p-3 rounded-md">
            246568
          </div>
        </div>
        <div className="w-full min-h-32 h-fit flex flex-col justify-center items-center gap-2 pl-2 pr-2">
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-amber-300">
                <img src="/image/xf/10028.png" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
                <span className="pl-1 ">花间游不动·唯我独尊</span>
                <span className="pr-1 flex gap-1">
                  <span className="text-amber-300 font-semibold">[我]</span>
                  <span className=" text-white">14段</span>
                </span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
          <div className="relative w-full h-12 bg-sky-50 rounded-l-full overflow-visible flex items-center gap-1">
            <div className="avatar size-12 w-14">
              <div className="rounded-full ring ring-offset-1 ring-offset-base-100 ring-lime-300">
                <img src="/image/xf/10786.png" />
              </div>
            </div>
            <div className="relative size-full flex flex-col">
              <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
                <span className="pl-1">滴滴顺风策·唯我独尊</span>
                <span className="pr-1  flex gap-1">
                  <span className="text-lime-300 font-semibold">[友]</span>
                  <span className="text-white">14段</span>
                </span>
              </span>
              <span className="text-sm text-right pr-1">
                胜率60% | 胜场999+
              </span>
            </div>
          </div>
        </div>
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
          <button
            type="submit"
            className="btn w-full bg-sky-50 text-sky-900  animate-pulse"
          >
            开始匹配
          </button>
        </form>

        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}
