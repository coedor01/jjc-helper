// components/SnackbarProvider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Button, SnackbarContent } from "@mui/material";

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
  showClientErrorSnackBar: (message?: string) => void;
  showServerErrorSnackBar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState<boolean>(true);

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOk(true);
    setOpen(true);
  };

  const showClientErrorSnackBar = (message?: string) => {
    let msg = message;

    if (!msg) {
      msg = "未知错误";
    }

    setMessage(msg);
    setOk(false);
    setOpen(true);
  };

  const showServerErrorSnackBar = () => {
    setMessage("网络错误");
    setOk(false);
    setOpen(true);
  };

  const handleClose = (
    event?: Event | React.SyntheticEvent<Element, Event>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        showClientErrorSnackBar,
        showServerErrorSnackBar,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: ok ? "success.main" : "error.main", // 更改背景颜色
            color: "white", // 更改文字颜色
            width: "90%", // 设置宽度适应手机屏幕
            maxWidth: "400px", // 设置最大宽度
            borderRadius: "8px", // 圆角
          },
        }}
      >
        <SnackbarContent
          message={message}
          action={
            <Button color="inherit" onClick={handleClose}>
              关闭
            </Button>
          }
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
