"use client";
import React, { FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import NavBar from "@/app/components/navBar";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/debounce";
import { signIn } from "next-auth/react";
import { useSnackbar } from "@/app/components/snackbarProvider";

interface Props {
  searchParams: { callbackUrl?: string };
}

const Login: React.FC<Props> = ({ searchParams }) => {
  const [loading, setLoading] = React.useState(false);

  const { showSnackbar, showClientErrorSnackBar, showServerErrorSnackBar } =
    useSnackbar();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    setLoading(true);

    // 获取表单数据
    const formData = new FormData(event.currentTarget);

    try {
      const res = await signIn("email-password-login", {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });

      console.log(`JSON.stringify(res)=${JSON.stringify(res)}`);

      if (res?.ok) {
        showSnackbar("登陆成功");
        const callbackUrl = searchParams?.callbackUrl;
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push("/teams");
        }
      } else {
        showClientErrorSnackBar("邮箱或密码错误");
      }
    } catch (error) {
      showServerErrorSnackBar();
    }

    setLoading(false);
  };

  const router = useRouter();
  const handleRegister = () => {
    const callbackUrl = searchParams?.callbackUrl;
    let url = "/auth/register";
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
      <NavBar title="邮箱密码登陆" />
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
            {loading ? "登陆中..." : "登陆"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleRegister}
            sx={{
              marginTop: "2px",
              width: "100%",
              padding: "10px 0",
              borderRadius: 0,
            }}
          >
            跳转至注册
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
