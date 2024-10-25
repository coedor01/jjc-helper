"use client";

import CenteredLoginPrompt from "@/app/components/centeredLoginPrompt";
import NavBar from "@/app/components/navBar";
import { toQueryString } from "@/app/utils";
import { Box, Grid2, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

function ProfileItem({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: "white", // 白色背景
        width: "100%", // 宽度占满父容器
        m: 0.1,
      }}
    >
      <Grid2
        container
        sx={{
          p: 2,
        }}
      >
        <Grid2 size={4}>
          <Typography>{title}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}

const Profile: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <>
      <NavBar title="我的信息" showBack={false} />
      {status === "unauthenticated" && (
        <CenteredLoginPrompt
          jumpUrl={
            "/auth/login" +
            "?" +
            toQueryString({
              callbackUrl: window.location.pathname,
            })
          }
        />
      )}
      {status === "authenticated" && (
        <Box
          sx={{
            marginTop: 1,
            flexDirection: "column",
          }}
        >
          <ProfileItem
            title="我的角色"
            onClick={() => router.push("/me/roles")}
          />
          <ProfileItem
            title="设备信息"
            onClick={() => router.push("/me/deviceInfo")}
          />
        </Box>
      )}
      {status === "authenticated" && <LogoutButton />}
    </>
  );
};

export default Profile;
