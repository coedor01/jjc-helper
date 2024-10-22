"use client";

import { Box, Chip, Grid2, SxProps, Theme, Typography } from "@mui/material";
import { TeamDetail } from "@/app/core/v1/schemas";
import { usePathname, useRouter } from "next/navigation";
import { toQueryString } from "@/app/utils";

interface Props {
  item: TeamDetail;
  sx?: SxProps<Theme>;
}

const TeamContent: React.FC<Props> = ({ item, sx }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClickJoinChip = () => {
    router.push(
      pathname +
        "/join" +
        "?" +
        toQueryString({
          callbackUrl: pathname,
        })
    );
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px 8px 0 0 ",
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
            {item.status === 0 && !item.inTeam && (
              <Chip
                sx={{
                  height: 28,
                  width: 56,
                }}
                color="primary"
                label="加入"
                variant="filled"
                size="small"
                onClick={handleClickJoinChip}
              />
            )}
            {item.status === 0 && item.inTeam && (
              <Chip
                sx={{
                  height: 28,
                  width: 56,
                }}
                color="primary"
                label="已加入"
                variant="outlined"
                size="small"
              />
            )}
            {item.status === 1 && !item.inTeam && (
              <Chip
                sx={{ width: 56 }}
                color="error"
                label="已满员"
                variant="outlined"
                size="small"
              />
            )}
            {item.status === 1 && item.inTeam && (
              <Chip
                sx={{ width: 56 }}
                color="error"
                label="待确认"
                variant="outlined"
                size="small"
              />
            )}
            {item.status === 2 && (
              <Chip
                sx={{ width: 56 }}
                color="primary"
                label="就绪"
                variant="outlined"
                size="small"
              />
            )}
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default TeamContent;
