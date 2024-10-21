"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";

const CenteredLoginPrompt: React.FC<{
  onLogin: () => void;
  hidden: boolean;
}> = ({ onLogin, hidden }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        padding: 2,
        display: hidden ? "none" : "inline-flex",
      }}
    >
      <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        请登陆后再查看
      </Typography>
      <Button
        variant="contained"
        onClick={onLogin}
        sx={{ width: "100%", maxWidth: 200 }}
      >
        登陆
      </Button>
    </Box>
  );
};

export default CenteredLoginPrompt;
