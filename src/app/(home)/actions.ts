"use client";

import { $首页_创建房间, $首页_加入房间 } from "@/socket";

export function createRoom(formData: FormData) {
  const rawFormData = {
    password: formData.get("password") as string,
  };

  if (!rawFormData?.password) {
    console.log("需要填写房间密码");
    return;
  }
  $首页_创建房间(rawFormData);
}

export function joinRoom(formData: FormData) {
  const rawFormData = {
    roomId: Number(formData.get("roomId")) as number,
    password: formData.get("password") as string,
  };

  if (!rawFormData?.roomId || !rawFormData?.password) {
    console.log("需要填写房间号和房间密码");
    return;
  }
  $首页_加入房间(rawFormData);
}
