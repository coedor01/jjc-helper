"use client";

import NavBar from "@/app/components/navBar";
import { RoleOut } from "@/app/core/v1/schemas";
import RoleList from "./components/RoleList";
import { useEffect, useState } from "react";

const Roles: React.FC = () => {
  const [roles, setRoles] = useState<RoleOut[]>([]);
  const fetchRoles = async () => {
    const res = await fetch("/api/roles");
    const body = await res.json();

    console.log(`body.data=${JSON.stringify(body.data)}`);
    if (body.ok) {
      setRoles(body.data);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <>
      <NavBar title="我的角色" />
      <RoleList items={roles} />
    </>
  );
};

export default Roles;
