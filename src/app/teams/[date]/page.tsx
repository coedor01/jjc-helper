"use server";

import * as React from "react";
import { redirect } from "next/navigation";

import { getSTimestamp, toQueryString } from "@/app/utils";
import { ROOT_PATH } from "@/app/teams/const";
import TeamInfo from "./components/TeamInfo";
import TabsPanel from "./components/TabsPanel";
import { getTeams } from "./services";
import { DEFAULT_QUERIES } from "./const";


interface Props {
  params: { date: string };
  searchParams: { teamType: string, clientType: string };
}


const TeamsOfDate: React.FC<Props> = async (
  { params, searchParams }
) => {
  console.log(`searchParams=${JSON.stringify(searchParams)}`);

  if (searchParams === undefined || Object.keys(searchParams).length === 0) {
    redirect(`${ROOT_PATH}/${params.date}?${toQueryString(DEFAULT_QUERIES)}`)
  }

  const dateLeft = new Date(params.date);
  const dateRight = new Date(dateLeft);
  dateRight.setDate(dateLeft.getDate() + 1);

  const teams = await getTeams({
    startAtLeft: getSTimestamp(dateLeft),
    startAtRight: getSTimestamp(dateRight),
    teamTypeIds: searchParams.teamType.split(",").map((value) => Number(value)),
    clientTypeIds: searchParams.clientType.split(",").map((value) => Number(value)),
  })

  return (
    <TabsPanel params={params} searchParams={searchParams}>
      <TeamInfo items={teams} />
    </TabsPanel>
  );
}
export default TeamsOfDate;