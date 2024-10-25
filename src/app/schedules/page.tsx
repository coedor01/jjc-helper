"use client";

import TabsPanel from "./components/TabsPanel";
import TeamInfo from "./components/TeamInfo";
import { useEffect, useState } from "react";
import { toQueryString } from "../utils";
import BottomNav from "../components/bottomNav";

interface Props {
  searchParams: { status?: string };
}

const SchedulePage: React.FC<Props> = ({ searchParams }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async (status: string) => {
    const res = await fetch("/api/teams/me" + "?" + toQueryString({ status }));
    const body = await res.json();

    if (body.ok) {
      setTeams(body.data);
    }
  };
  useEffect(() => {
    if (searchParams?.status) {
      fetchTeams(searchParams?.status);
    }
  }, [searchParams]);

  return (
    <>
      <TabsPanel searchParams={searchParams}>
        <TeamInfo items={teams} />
      </TabsPanel>
      <BottomNav />
    </>
  );
};

export default SchedulePage;
