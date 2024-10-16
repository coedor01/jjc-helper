import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Team } from "@prisma/client";

interface Props {
  items: Team[],
}

const TeamInfo: React.FC<Props> = ({ items }) => {
  return (
    <List aria-label="mailbox folders">
      {items.map((item, key) => (
        <>
          <ListItem key={key}>
            <ListItemText primary={JSON.stringify(item)} />
          </ListItem>
          <Divider component="li" />
        </>
      ))}
    </List>
  );
}

export default TeamInfo;