"use client";

import { io } from "socket.io-client";

export const socket = io("ws://127.0.0.1:13000", {
  withCredentials: true,
});

export function $鉴权(data: { server: string | null; name: string | null }) {
  socket.emit("鉴权", data);
}

export function $首页_创建房间(data: { password: string }) {
  socket.emit("首页_创建房间", data);
}

export function $首页_加入房间(data: { roomId: number; password: string }) {
  socket.emit("首页_加入房间", data);
}

export function $房间中_开始匹配(data: {
  clientTypeId: number;
  teamTypeId: number;
}) {
  socket.emit("房间中_开始匹配", data);
}

export function $房间中_退出房间() {
  socket.emit("房间中_退出房间");
}

export function $匹配成功_确认() {
  socket.emit("匹配成功_确认");
}

export function $匹配成功_取消() {
  socket.emit("匹配成功_取消");
}

export function $队伍中_发送消息(data: { content: any }) {
  socket.emit("队伍中_发送消息", data);
}

export enum 服务端事件 {
  当前状态 = "当前状态",
  房间中_人员变动 = "房间中_人员变动",
  匹配中_有人确认 = "匹配中_有人确认",
  队伍中_新消息 = "队伍中_新消息",
}

export type 状态类型 = "首页" | "房间中" | "匹配成功" | "队伍中";

export interface 当前状态结构体 {
  状态: 状态类型;
  数据: any;
}
