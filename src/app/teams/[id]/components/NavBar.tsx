"use client";

import { IconButton, Typography, Grid2, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: "white", // 可以根据需要修改颜色
        color: "black",
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
            <ArrowBackIcon
              sx={{ height: 20, width: 20, color: "text.primary" }}
            />
          </IconButton>
        </Grid2>
        <Grid2 size={8}>
          <Typography
            variant="subtitle2"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            招募详情
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={4}></Grid2>
    </Paper>
  );
};

export default NavBar;
