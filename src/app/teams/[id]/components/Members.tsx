import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Grid2,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { TeamDetail } from "@/app/core/v1/schemas";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  item: TeamDetail;
  sx?: SxProps<Theme>;
}

const Members: React.FC<Props> = ({ item, sx }) => {
  console.log(`item=${JSON.stringify(item)}`);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        ...sx,
      }}
    >
      {item.members.map((member, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id={`panel-header-teams-${item.id}-members-${member.id}`}
          >
            <Grid2
              container
              sx={{
                display: "flex",
                alignItems: "center", // 垂直居中
                width: "100%",
                g: 1,
              }}
            >
              <Grid2 size={1}>
                <Avatar src={member.avatar} sx={{ height: 24, width: 24 }} />
              </Grid2>
              <Grid2 size={4}>
                <Typography>{member.name}</Typography>
              </Grid2>
              <Grid2 size={2}>
                {member.confirmed && <Typography>已确认</Typography>}
              </Grid2>
              <Grid2 size={2}>
                {member.isMe && <Typography>我</Typography>}
              </Grid2>
              <Grid2 size={3}>
                <Typography>
                  {member.currentScore}/{member.maxScore}
                </Typography>
              </Grid2>
            </Grid2>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 1 }}>
              <Grid2 container>
                <Grid2 size={3}>
                  <Typography variant="subtitle2">能打多久：</Typography>
                </Grid2>
                <Grid2 size={9}>
                  <Typography variant="subtitle2">
                    {member.playDurationText}
                  </Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ p: 1 }}>
              <Grid2 container>
                <Grid2 size={3}>
                  <Typography variant="subtitle2">参与招募：</Typography>
                </Grid2>
                <Grid2 size={9}>
                  <Typography variant="subtitle2">
                    {member.pigeonTotalText}
                  </Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2">时间统计：</Typography>
              {member.pigeonTimeStatsArr.map((stat, index) => (
                <Grid2 container key={index}>
                  <Grid2 size={3}>
                    <Typography variant="subtitle2">{stat.label}</Typography>
                  </Grid2>
                  <Grid2 size={9}>
                    <Typography variant="subtitle2">{stat.value}</Typography>
                  </Grid2>
                </Grid2>
              ))}
            </Box>
            <Box sx={{ p: 1 }}>
              <Typography variant="subtitle2">心法统计：</Typography>
              {member.xinfaStatsArr.map((stat, index) => (
                <Grid2 container key={index}>
                  <Grid2 size={3}>
                    <Typography variant="subtitle2">{stat.label}</Typography>
                  </Grid2>
                  <Grid2 size={9}>
                    <Typography variant="subtitle2">{stat.value}</Typography>
                  </Grid2>
                </Grid2>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Members;
