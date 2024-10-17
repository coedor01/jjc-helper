import { Box, Chip, Grid2, Typography } from "@mui/material";
import { TeamOut } from "../schemas";

interface Props {
  item: TeamOut;
}

const Content: React.FC<Props> = ({ item }) => {
  const status: number = 0;

  return (
    <Box
      sx={{
        paddingTop: "5px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Grid2
          container
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "8px 4px",
            alignItems: "center",
          }}
        >
          <Grid2 size={2}>
            <Typography
              variant="subtitle2"
              sx={{
                borderRight: "1px solid grey",
                padding: "2px 0",
              }}
            >
              {item.clientType}
            </Typography>
          </Grid2>
          <Grid2 size={5}>
            <Typography
              variant="subtitle2"
              sx={{
                padding: "2px 0",
              }}
            >
              {item.teamType}
            </Typography>
          </Grid2>
          <Grid2 size={2}>
            <Typography
              variant="subtitle2"
              sx={{
                borderLeft: "1px solid grey",
                borderRight: "1px solid grey",
                padding: "2px 0",
              }}
            >
              {item.level}
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Chip
              sx={{
                display: status === 0 ? "inline-flex" : "none",
                height: 28,
                width: 56,
              }}
              color="primary"
              label="加入"
              variant="filled"
              size="small"
            />
            <Chip
              sx={{ display: status === 1 ? "inline-flex" : "none", width: 56 }}
              color="error"
              label="待确认"
              variant="outlined"
              size="small"
            />
            <Chip
              sx={{ display: status === 2 ? "inline-flex" : "none", width: 56 }}
              color="primary"
              label="就绪"
              variant="outlined"
              size="small"
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Content;
