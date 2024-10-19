"use client";

import { IconButton, Typography, Grid2, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
}

const NavBar: React.FC<Props> = ({ title }) => {
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
            {title}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={4}></Grid2>
    </Box>
  );
};

export default NavBar;
