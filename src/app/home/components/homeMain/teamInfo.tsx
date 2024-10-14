import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FilterContext from "./context";
import { WeekItemOtherQueries } from "./const";

interface TeamInfoProps {
  queries: WeekItemOtherQueries;
}

const TeamInfo: React.FC<TeamInfoProps> = ({
  queries
}) => {
  const {
    orderBy,
    teamTypeValues,
    clientTypeValues,
    timeTypeValues,
  } = React.useContext(FilterContext);


  return (
    <List aria-label="mailbox folders">
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={orderBy} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={teamTypeValues} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={clientTypeValues} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={timeTypeValues} />
      </ListItem>
    </List>
  );
}
export default TeamInfo;
