import { readLocalJsonFile } from "@/app/utils";
import Body from "./components/Body";

export default async function RoomWatingPage({
  params,
}: {
  params: { id: string };
}) {
  const teamTypes = readLocalJsonFile("teamTypes.json");
  const clientTypes = readLocalJsonFile("clientTypes.json");
  const body = await fetch(`/api/rooms/${params.id}`);
  return (
    <>
      <Body teamTypes={teamTypes} clientTypes={clientTypes} />
    </>
  );
}
