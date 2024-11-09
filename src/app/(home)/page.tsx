import Body from "./components/Body";
import { readLocalJsonFile } from "../utils";

export default function HomePage() {
  const teamTypes = readLocalJsonFile("teamTypes.json");
  const clientTypes = readLocalJsonFile("clientTypes.json");
  const gameRole = {
    zoneName: "",
    roleName: "花间游不动",
    serverName: "唯我独尊",
    kungfuId: "10028",
    panelList: { score: 466666, panel: [] },
  };

  return (
    <Body teamTypes={teamTypes} clientTypes={clientTypes} gameRole={gameRole} />
  );
}
