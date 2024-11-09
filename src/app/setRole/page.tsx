import Body from "./components/Body";
import { readLocalJsonFile } from "../utils";

export default async function RootPage() {
  const servers = readLocalJsonFile("servers.json");
  return <Body servers={servers} />;
}
