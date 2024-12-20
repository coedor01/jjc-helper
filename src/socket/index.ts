"use client";

import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./types";

type TypedClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

function createSocket(
  fingerprint: string,
  server: string,
  name: string
): TypedClientSocket {
  const auth = { fingerprint, server, name };

  const socket = io("ws://192.168.1.223:13000", {
    withCredentials: true,
    transports: ["websocket"],
    auth,
  });

  return socket;
}

export { createSocket };

export type { TypedClientSocket };
