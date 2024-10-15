"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFingerprint } from "./utils";


export default function Jump() {
  const router = useRouter();

  useEffect(() => {
    const guestLogin = async () => {
      const signature = await getFingerprint();

      const res = await signIn("credentials", {
        redirect: false,
        signature,
      });

      console.log(res);

      if (res?.ok) {
        // 登录成功后跳转到主页或其他页面
        router.push("/teams");

      } else {
        // 处理登录失败的情况
        console.error("Login failed");
      }
    };
    guestLogin();
  }, [router]);

  return <div>测速页</div>;
}
