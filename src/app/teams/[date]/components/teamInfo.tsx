import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "next/navigation";


const TeamInfo: React.FC = () => {
  const searchParams = useSearchParams();
  const paramsArray = Array.from(searchParams.entries());

  return (
    <List aria-label="mailbox folders">
      {paramsArray.map(([name, value], key) => (
        <>
          <ListItem key={key}>
            <ListItemText primary={`${name}: ${value}`} />
          </ListItem>
          <Divider component="li" />
        </>
      ))}
    </List>
  );
}
export default TeamInfo;
