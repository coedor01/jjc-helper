"use server";

import * as React from "react";
import { redirect } from "next/navigation";

import {
  getDateString,
  getSTimestamp,
  stringToDate,
  toQueryString,
} from "@/app/utils";
import { ROOT_PATH } from "@/app/teams/const";
import { routes } from "@/app/const";
import SideBar from "@/app/components/sideBar";
import TeamInfo from "./components/TeamInfo";
import TabsPanel from "./components/TabsPanel";
import { getTeams } from "./services";
import { DEFAULT_QUERIES } from "./const";
import OperationBar from "./components/OperationBar";

interface Props {
  searchParams: { teamType: string; clientType: string };
}

const Teams: React.FC<Props> = async ({ searchParams }) => {
  const date = getDateString(new Date());

  console.log(`searchParams=${JSON.stringify(searchParams)}`);
  console.log(
    `Object.keys(searchParams).length=${Object.keys(searchParams).length}`
  );
  console.log(`DEFAULT_QUERIES=${JSON.stringify(DEFAULT_QUERIES)}`);

  if (searchParams === undefined || Object.keys(searchParams).length === 0) {
    redirect(`${ROOT_PATH}?${toQueryString({ date, ...DEFAULT_QUERIES })}`);
  }

  const dateLeft = stringToDate(date, 8);
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

  return (
    <>
      <TabsPanel searchParams={searchParams}>
        <TeamInfo items={teams} />
      </TabsPanel>
      <OperationBar />

      <SideBar routes={routes} currentRoute={ROOT_PATH} />
    </>
  );
};
export default Teams;
