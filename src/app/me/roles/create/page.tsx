"use server";

import React from "react";
import prisma from "@/client";
import { fetchServers, fetchXinFas } from "@/app/core/v1/services";
import RolesCreateCC from "./components/RoleCreateCC";

const RolesCreateSC: React.FC = async () => {
  const servers = await fetchServers(prisma);
  const xinFas = await fetchXinFas(prisma);
  return <RolesCreateCC servers={servers} xinFas={xinFas} />;
};

export default RolesCreateSC;
