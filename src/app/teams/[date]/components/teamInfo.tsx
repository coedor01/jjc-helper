import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { TeamOut } from "../schemas";
import { Avatar, Box, Grid, Grid2, Stack } from "@mui/material";

interface TeamItemProps {
  item: TeamOut,
}


interface Props {
  items: TeamOut[],
}

const TeamItem: React.FC<TeamItemProps> = ({
  item
}) => {
  return (
    <Box>
      <Box>
        <Box>{item.clientType}</Box>
        <Box>{item.teamType}</Box>
        <Box>{item.level}</Box>
      </Box >
      <Divider component="li" />
      <Box>
        <Box >{item.startAt}</Box>
        <Box >
          {item.members.map((item, index) =>
            <Avatar alt={item.avatar} key={index} src={item.avatar} sx={{ width: 24, height: 24 }} />
          )}
        </Box>
        <Box >{item.currentMemberCount}/{item.maxMemberCount}</Box>
      </Box>
    </Box>
  )
}

const TeamInfo: React.FC<Props> = ({ items }) => {
  return (
    <Box>
      {
        items.map((item, index) => (
          <TeamItem item={item} />
        ))
      }
    </Box>

  );
}

export default TeamInfo;