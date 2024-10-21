"use client";

import React, { FormEvent, useState } from "react";
import NavBar from "@/app/components/navBar";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useSnackbar } from "@/app/components/snackbarProvider";
import useDebounce from "@/hooks/debounce";
import { Server, XinFa } from "@prisma/client";
import { createRole } from "@/app/axios/localServices";

interface Props {
  servers: Server[];
  xinFas: XinFa[];
}

const RolesCreateCC: React.FC<Props> = ({ servers, xinFas }) => {
  const [loading, setLoading] = React.useState(false);

  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    setLoading(true);

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const server = formData.get("server") as string;
    const xinFa = formData.get("xinFa") as string;
    const roleName = formData.get("roleName") as string;
    if (server && xinFa && roleName) {
      try {
        const res = await createRole({
          server,
          xinFa,
          roleName,
        });
        console.log(`response=${res}`);
      } catch (error) {
        showServerErrorSnackBar();
      }
    }

    setLoading(false);
  };
  const [server, setServer] = React.useState("");
  const handleServerChange = (event: SelectChangeEvent) => {
    setServer(event.target.value as string);
  };
  const [xinfa, setXinFa] = React.useState("");
  const handleXinFaChange = (event: SelectChangeEvent) => {
    setXinFa(event.target.value as string);
  };

  const [roleNameError, setRoleNameError] = useState<boolean>(false);
  const [roleNameErrorText, setRoleNameErrorText] = useState<string>("");
  const handleRoleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const chineseCharacterRegex = /^[\u4e00-\u9fa5]+$/;

    if (!chineseCharacterRegex.test(value)) {
      setRoleNameError(true);
      setRoleNameErrorText("游戏名称必须由简体中文汉字组成");
    } else {
      setRoleNameError(false);
      setRoleNameErrorText("");
    }
  };
  return (
    <>
      <NavBar title="创建角色" />
      <Box component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            marginTop: "5px",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Box
            sx={{
              p: 1,
            }}
          >
            <FormControl
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="server-select-label">服务器</InputLabel>
              <Select
                labelId="server-select-label"
                id="server-select"
                name="server"
                value={server}
                label="Server"
                onChange={handleServerChange}
              >
                {servers.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                margin: "5px 0",
              }}
            >
              <InputLabel id="xinfa-select-label">心法</InputLabel>
              <Select
                labelId="xinfa-select-label"
                id="xinfa-select"
                name="xinFa"
                value={xinfa}
                label="XinFa"
                onChange={handleXinFaChange}
              >
                {xinFas.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="roleName"
              name="roleName"
              label="角色名"
              variant="outlined"
              onChange={useDebounce(handleRoleNameChange, 500)}
              error={roleNameError}
              helperText={roleNameErrorText}
              sx={{
                margin: "5px 0",
                width: "100%",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "5px",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ width: "100%", padding: "10px 0", borderRadius: 0 }}
          >
            {loading ? "创建中..." : "创建"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RolesCreateCC;
