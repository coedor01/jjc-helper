"use client";

import { IconButton, Typography, Box, Grid2 } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

const NavBar: React.FC<Props> = ({ params }) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: "primary.light", // 可以根据需要修改颜色
        color: "white",
        position: "relative",
        height: "50px", // 设置高度
      }}
    >
      <Grid2
        container
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Grid2 size={2}>
          <IconButton onClick={handleBackClick} sx={{ color: "white" }}>
            <ArrowBackIcon sx={{ height: 24, width: 24 }} />
          </IconButton>
        </Grid2>
        <Grid2 size={8}>
          <Typography
            variant="subtitle1"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            招募详情
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={4}></Grid2>
    </Box>
  );
};

export default NavBar;
