"use server";

import { notFound } from "next/navigation";
import Content from "./components/Content";
import NavBar from "./components/NavBar";
import { getTeam } from "./services";

interface Props {
  params: { id: string };
}

const TeamDetail: React.FC<Props> = async ({ params }) => {
  console.log(`JSON.stringify(params)=${JSON.stringify(params)}`);

  const item = await getTeam(Number(params.id));
  if (item === null) {
    notFound();
  }

  return (
    <>
      <NavBar params={params} />
      <Content item={item} />
    </>
  );
};

export default TeamDetail;
