import * as React from "react";
import { redirect } from "next/navigation";

import {
  getDateString,
  getSTimestamp,
  stringToDate,
  toQueryString,
} from "@/app/utils";
import { ROOT_PATH } from "@/app/teams/const";
import { getTeams } from "./services";
import { DEFAULT_QUERIES } from "./const";
import OperationBar from "./components/OperationBar";
import BottomNav from "../components/bottomNav";
import TabBar from "../components/tabBar";
import { getGameRoles, getSessionUser } from "../core/v1/services";
import prisma from "@/client";
import { GameRoleOut } from "../core/v1/schemas";

const TeamsLoading = () => (
  <>
    <TabBar isLogin={false} gameRoles={[]} />
    <BottomNav />
  </>
);

interface Props {
  searchParams: { date: string; teamType: string; clientType: string };
}

const Teams: React.FC<Props> = async ({ searchParams }) => {
  const defaultDate = getDateString(new Date());

  if (searchParams === undefined || Object.keys(searchParams).length === 0) {
    redirect(
      `${ROOT_PATH}?${toQueryString({ date: defaultDate, ...DEFAULT_QUERIES })}`
    );
  }

  const dateLeft = stringToDate(searchParams.date, 8);
  const dateRight = new Date(dateLeft);
  dateRight.setDate(dateLeft.getDate() + 1);

  const teams = await getTeams({
    startAtLeft: getSTimestamp(dateLeft),
    startAtRight: getSTimestamp(dateRight),
    teamTypeIds: searchParams.teamType.split(",").map((value) => Number(value)),
    clientTypeIds: searchParams.clientType
      .split(",")
      .map((value) => Number(value)),
  });

  const user = await getSessionUser(prisma);
  let gameRoles: GameRoleOut[] = [];
  if (user) {
    gameRoles = await getGameRoles(prisma, user.id);
  }

  return (
    <>
      <React.Suspense fallback={<TeamsLoading />}>
        <TabBar isLogin={user !== null} gameRoles={gameRoles} />

        <div className="w-full h-full overflow-y-auto">
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
          <div className="w-full h-12 bg-green-300 border-t-2"></div>
        </div>
        <OperationBar />
        <BottomNav />
      </React.Suspense>
    </>
  );
};
export default Teams;
