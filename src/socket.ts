"use client";

import { io } from "socket.io-client";
import { Server } from "@/app/types";

export const socket = io("ws://127.0.0.1:13000", {
  withCredentials: true,
  transports: ["websocket"],
});

export function $选择角色_选定(data: {
  server: string | null;
  name: string | null;
}) {
  socket.emit("选择角色_选定", data);
}

export function $首页_创建房间(data: { password: string }) {
  socket.emit("首页_创建房间", data);
}

export function $首页_加入房间(data: { roomId: number; password: string }) {
  socket.emit("首页_加入房间", data);
}

export function $首页_开始单人匹配(data: {
  clientTypeId: number;
  teamTypeId: number;
}) {
  socket.emit("首页_开始单人匹配", data);
}

export function $首页_取消单人匹配() {
  socket.emit("首页_取消单人匹配");
}

export function $房间中_开始匹配(data: {
  clientTypeId: number;
  teamTypeId: number;
}) {
  socket.emit("房间中_开始匹配", data);
}

export function $房间中_取消匹配() {
  socket.emit("房间中_取消匹配");
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
  错误 = "错误",
  静态数据变动 = "静态数据变动",
  角色信息变动 = "角色信息变动",
  状态变动 = "状态变动",
  房间中_房间信息 = "房间中_房间信息",
  房间中_人员变动 = "房间中_人员变动",
  房间中_房间状态变更 = "房间中_房间状态变更",
  匹配中_有人确认 = "匹配中_有人确认",
  队伍中_新消息 = "队伍中_新消息",
}

export type 状态类型 = "选择角色" | "首页" | "房间中" | "匹配成功" | "队伍中";

export interface 状态变动结构体 {
  状态: 状态类型;
  是否正在匹配: boolean;
}

export interface 服务器 {
  id: string;
  name: string;
}

export interface 招募类型 {
  id: number;
  label: string;
  value: string;
  maxMemberCount: number;
}

export interface 客户端类型 {
  id: number;
  label: string;
}

export interface 静态数据变动结构体 {
  服务器: 服务器[];
  招募类型: 招募类型[];
  客户端类型: 客户端类型[];
}

export interface 角色信息 {
  zoneName: string;
  roleName: string;
  serverName: string;
  kungfuId: string;
  panelList: {
    score: number;
    panel: {
      name: string;
      percent: boolean;
      value: number;
    }[];
  };
}

export type 房间状态类型 = "等待中" | "匹配中";

export interface 房间中_房间信息结构体 {
  房间ID: number;
  成员: 角色信息[];
  是否房主: boolean;
  状态: 房间状态类型;
}

export interface 房间中_人员变动结构体 {
  成员: 角色信息[];
}

export interface 房间中_房间状态变更结构体 {
  状态: 房间状态类型;
}
