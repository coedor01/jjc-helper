import { AxiosResponse } from "axios";
import Services from "../services";
import { Data } from "../types";

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/api/register", {
    email,
    password,
  });
  return res;
}

export async function createGameRole({
  serverId,
  xinFaId,
  name,
}: {
  serverId: number;
  xinFaId: number;
  name: string;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/api/roles", {
    serverId,
    xinFaId,
    name,
  });
  return res;
}
