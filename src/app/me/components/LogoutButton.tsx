import React from "react";
import { Button, Box } from "@mui/material";
import { signOut } from "next-auth/react"; // 引入退出登录的函数

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false }); // 退出登录
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 1,
        display: "flex",
      }}
    >
      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{ width: "100%", padding: "10px", borderRadius: 0 }}
      >
        退出登录
      </Button>
    </Box>
  );
};

export default LogoutButton;
