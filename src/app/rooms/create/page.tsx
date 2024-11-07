"use client";

import { Suspense, useEffect, useState } from "react";
import Body from "./components/Body";

export default function RoomCreatePage() {
  const [servers, setServers] = useState([]);
  const [teamTypes, setTeamTypes] = useState([]);
  const [clientTypes, setClientTypes] = useState([]);

  useEffect(() => {
    async function fetchServers() {
      const res = await fetch("/servers.json");
      const data = await res.json();
      setServers(data);
    }
    async function fetchTeamTypes() {
      const res = await fetch("/teamTypes.json");
      const data = await res.json();
      setTeamTypes(data);
    }
    async function fetchClientTypes() {
      const res = await fetch("/clientTypes.json");
      const data = await res.json();
      setClientTypes(data);
    }
    fetchServers();
    fetchTeamTypes();
    fetchClientTypes();
  }, []);

  return (
    <Suspense>
      <Body servers={servers} teamTypes={teamTypes} clientTypes={clientTypes} />
    </Suspense>
  );
}
