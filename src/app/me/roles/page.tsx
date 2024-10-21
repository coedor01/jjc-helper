"use server";

import NavBar from "@/app/components/navBar";
import { Box } from "@mui/material";
import { fetchMyRoles } from "./services";
import { getServerSession } from "next-auth";
import { Role } from "./schemas";
import RoleList from "./components/RoleList";

const Roles: React.FC = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;
  let items: Role[] = [];
  if (email) {
    items = await fetchMyRoles(email);
  }
  for (const item of items) {
    console.log(`item=${JSON.stringify(item)}`);
  }

  return (
    <>
      <NavBar title="我的角色" />
      <RoleList items={items} />
    </>
  );
};

export default Roles;
