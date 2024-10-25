"use client";

import { GameRoleOut } from "@/app/core/v1/schemas";
import useQueryHook from "@/hooks/query";
import useWeekDays from "@/hooks/useWeekDays";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";

interface Props {
  isLogin: boolean;
  gameRoles: GameRoleOut[];
}

export default function TabBar({ isLogin, gameRoles }: Props) {
  const tabs = useWeekDays();
  const activeTab = tabs.filter((item) => item.active);

  const router = useRouter();
  const pathname = usePathname();
  const { upsertQueryString } = useQueryHook();
  const handleClickChooseDate = (value: string) => {
    const newQuery = upsertQueryString("date", value);
    router.replace(pathname + "?" + newQuery);
  };
  let initialGameRole: GameRoleOut | null = null;
  if (gameRoles && gameRoles.length > 0) {
    initialGameRole = gameRoles[0];
  }

  const [currentGameRole, setCurrentGameRole] = useState<
    GameRoleOut | null | undefined
  >(initialGameRole);
  const [showEditGameRole, setShowEditGameRole] = useState<boolean>(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const roleId = Number(formData.get("roleId")) as number;
    const role = gameRoles.find((item) => item.id === roleId);
    console.log(roleId);
    console.log(gameRoles);

    setCurrentGameRole(role);
    setShowEditGameRole(false);
  }
  return (
    <>
      {showEditGameRole && (
        <>
          <div className="fixed top-0 h-full w-full bg-black opacity-50 z-10"></div>
          <div className="fixed top-0 h-full w-full z-20 flex flex-col justify-center items-center">
            <div className="card bg-base-100 w-80 shadow-xl ">
              <form
                className="card-body items-center text-center"
                onSubmit={handleSubmit}
              >
                {gameRoles.map((role, index) => (
                  <div className="form-control" key={index}>
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="roleId"
                        className="radio checked:bg-red-500 relative right-2"
                        defaultChecked={role.id === currentGameRole?.id}
                        value={role.id}
                      />
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={role.xf.icon} />
                        </div>
                      </div>
                      <span className="text-lg relative left-2">{`${role.name}·${role.server.name}`}</span>
                    </label>
                  </div>
                ))}

                <div className="card-actions w-full flex pt-2">
                  <button
                    className="flex-1 btn"
                    onClick={() => setShowEditGameRole(false)}
                  >
                    取消
                  </button>
                  <button className="flex-1 btn btn-primary" type="submit">
                    确认
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="fixed top-0 navbar bg-base-100">
        {!isLogin && (
          <div className="flex-1 animate-pulse" onClick={() => signIn()}>
            <a className="btn btn-ghost text-xl">请登录选择角色</a>
          </div>
        )}
        {isLogin && !currentGameRole && (
          <div
            className="flex-1 animate-pulse"
            onClick={() => router.push("/me/roles/create")}
          >
            <a className="btn btn-ghost text-xl ">点击绑定角色</a>
          </div>
        )}
        {isLogin &&
          currentGameRole !== null &&
          currentGameRole !== undefined && (
            <div className="flex-1" onClick={() => setShowEditGameRole(true)}>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={currentGameRole.xf.icon} />
                </div>
              </div>
              <a className="btn btn-ghost text-xl pl-1 pr-1">{`${currentGameRole.name}·${currentGameRole.server.name}`}</a>
              <FaPenToSquare />
            </div>
          )}

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="w-24">
                  {activeTab.length > 0 ? activeTab[0].label : "选择日期"}
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  {tabs.map((tab, index) => (
                    <li
                      key={index}
                      onClick={() => handleClickChooseDate(tab.value)}
                    >
                      <a>{tab.label}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
