"use client";
import {
  招募类型,
  客户端类型,
  角色信息,
  房间状态类型,
  $房间中_取消匹配,
} from "@/socket";
import { getXfIcon } from "@/utils/jx3";
import { startRoomMatching } from "../actions";

interface Props {
  id: number | null;
  teamTypes: 招募类型[] | null;
  clientTypes: 客户端类型[] | null;
  members: 角色信息[];
  isOwner: boolean;
  roomStatus: 房间状态类型;
}

export default function Body({
  id,
  teamTypes,
  clientTypes,
  members,
  isOwner,
  roomStatus,
}: Props) {
  if (!id || !teamTypes || !clientTypes) {
    return <>加载中</>;
  }

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
                  <img src={getXfIcon(item.kungfuId)} />
                </div>
              </div>
              <div className="relative size-full flex flex-col">
                <span className="text-right bg-gradient-to-r from-sky-50 to-sky-700 flex items-center justify-between">
                  <span className="pl-1 ">{`${item.roleName}·${item.serverName}`}</span>
                </span>
                <span className="flex-1 text-sm flex items-center justify-between">
                  <span className="pl-1">{`装分 ${item.panelList.score}`}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        {isOwner && (
          <form
            action={startRoomMatching}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full bg-sky-50 rounded-md overflow-y-auto overscroll-contain flex flex-col items-center justify-center pt-4 pb-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">招募类型</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="teamTypeId"
                  disabled={roomStatus === "匹配中"}
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
                  disabled={roomStatus === "匹配中"}
                >
                  {clientTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {roomStatus === "等待中" && (
              <button
                type="submit"
                className="btn w-full bg-sky-50 text-sky-900  animate-pulse"
              >
                开始匹配
              </button>
            )}
          </form>
        )}
        {roomStatus === "等待中" && !isOwner && (
          <div className="text-white">等待房主开始</div>
        )}
        {roomStatus === "匹配中" && (
          <div className="text-white">正在匹配...</div>
        )}
        {roomStatus === "匹配中" && isOwner && (
          <button
            className="btn w-full bg-sky-900 text-white "
            onClick={$房间中_取消匹配}
          >
            取消
          </button>
        )}
      </div>
    </div>
  );
}
