import { readLocalJsonFile } from "@/utils/server";
import Body from "./components/Body";

export default async function SetRolePage() {
  const servers = await readLocalJsonFile("servers.json");
  return <Body servers={servers} />;
}
