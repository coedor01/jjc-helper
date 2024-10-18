import { Box, Grid2, SxProps, Theme, Typography } from "@mui/material";
import { TeamOut } from "../schemas";
import CountdownTimer from "@/app/components/countDownTimer";

interface Props {
  item: TeamOut;
  sx?: SxProps<Theme>;
}

const WarningBar: React.FC<Props> = ({ item, sx }) => {
  return (
    <Box sx={sx}>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            padding: "1px 0",
          }}
        >
          <Typography variant="subtitle2">距离招募结束还有</Typography>
        </Box>
        <CountdownTimer
          targetTimestamp={item.startAtTs}
          sx={{
            backgroundColor: "primary.light",
            color: "white",
          }}
        />
      </Box>
    </Box>
  );
};

export default WarningBar;
