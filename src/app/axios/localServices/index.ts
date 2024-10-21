import axios, { AxiosResponse } from "axios";
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

export async function createRole({
  server,
  xinFa,
  roleName,
}: {
  server: string;
  xinFa: string;
  roleName: string;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/api/roles", {
    server,
    xinFa,
    roleName,
  });
  return res;
}
