"use client";

import React, { FormEvent, useState } from "react";

import NavBar from "@/app/components/navBar";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/debounce";
import { register } from "@/app/axios/localServices";
import { signIn } from "next-auth/react";
import { useSnackbar } from "@/app/components/snackbarProvider";

interface Props {
  searchParams: { callbackUrl: string };
}

const Register: React.FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    setLoading(true);

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (
      email === null ||
      email === undefined ||
      password === null ||
      password === undefined
    ) {
      throw new Error("未输入邮箱或密码");
    }
    try {
      const res = await register({
        email: email.toString(),
        password: password.toString(),
      });
      if (res.data.ok) {
        showSnackbar("注册成功");
        await signIn("email-password-login", {
          redirect: false,
          email,
          password,
        });

        const callbackUrl = searchParams?.callbackUrl;
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push("/teams");
        }
      } else {
        showClientErrorSnackBar(res.data?.error);
      }
    } catch (error) {
      showServerErrorSnackBar();
    }

    setLoading(false);
  };

  const handleLogin = () => {
    const callbackUrl = searchParams?.callbackUrl;
    let url = "/auth/login";
    if (callbackUrl) {
      url = url + `?callbackUrl=${callbackUrl}`;
    }
    router.push(url);
  };

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!emailPattern.test(value)) {
      setEmailError(true);
      setEmailErrorText("邮箱格式错误");
    } else {
      setEmailError(false);
      setEmailErrorText("");
    }
  };

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (!passwordPattern.test(value)) {
      setPasswordError(true);
      setPasswordErrorText("密码需要至少8位，且同时携带数字、字母和符号");
    } else {
      setPasswordError(false);
      setPasswordErrorText("");
    }
  };

  return (
    <>
      <NavBar title="注册" />
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
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={useDebounce(handleEmailChange, 500)}
              error={emailError}
              helperText={emailErrorText}
              sx={{
                margin: "5px 0",
                width: "100%",
              }}
            />
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={useDebounce(handlePasswordChange, 500)}
              error={passwordError}
              helperText={passwordErrorText}
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
            {loading ? "注册中..." : "注册"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{
              marginTop: "2px",
              width: "100%",
              padding: "10px 0",
              borderRadius: 0,
            }}
          >
            跳转至登陆
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Register;
