"use server";

import { notFound } from "next/navigation";
import TeamContent from "./components/TeamContent";
import NavBar from "./components/NavBar";
import { getTeam } from "./services";
import WarningBar from "./components/WarningBar";
import Members from "./components/Members";

interface Props {
  params: { id: string };
}

const TeamDetail: React.FC<Props> = async ({ params }) => {

  const item = await getTeam(Number(params.id));
  if (item === null) {
    notFound();
  }

  return (
    <>
      <NavBar />
      <TeamContent item={item} sx={{ paddingTop: "5px" }} />
      <WarningBar item={item} sx={{ paddingTop: "5px" }} />
      <Members item={item} sx={{ marginTop: "5px" }} />
    </>
  );
};

export default TeamDetail;
