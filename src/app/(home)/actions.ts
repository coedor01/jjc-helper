"use client";

import {
  $首页_创建房间,
  $首页_加入房间,
  $选择角色_选定,
  $房间中_开始匹配,
  $首页_开始单人匹配,
} from "@/socket";

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

export function setRole(formData: FormData) {
  const rawFormData = {
    server: formData.get("server") as string,
    name: formData.get("name") as string,
  };
  if (!rawFormData?.server || !rawFormData?.name) {
    console.log("需要填写服务器和昵称");
    return;
  }
  $选择角色_选定(rawFormData);
}

export function startRoomMatching(formData: FormData) {
  const rawFormData = {
    clientTypeId: Number(formData.get("clientTypeId")) as number,
    teamTypeId: Number(formData.get("teamTypeId")) as number,
  };
  if (!rawFormData?.clientTypeId || !rawFormData?.teamTypeId) {
    console.log("需要填写客户端类型和招募类型");
    return;
  }
  $房间中_开始匹配(rawFormData);
}

export function startMatching(formData: FormData) {
  const rawFormData = {
    clientTypeId: Number(formData.get("clientTypeId")) as number,
    teamTypeId: Number(formData.get("teamTypeId")) as number,
  };
  if (!rawFormData?.clientTypeId || !rawFormData?.teamTypeId) {
    console.log("需要填写客户端类型和招募类型");
    return;
  }
  $首页_开始单人匹配(rawFormData);
}
