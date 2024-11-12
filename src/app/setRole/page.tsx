import Body from "./components/Body";
import { readLocalJsonFile } from "@/utils/server";

export default async function RootPage() {
  const servers = readLocalJsonFile("servers.json");
  return <Body servers={servers} />;
}
