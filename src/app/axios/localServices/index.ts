import { AxiosResponse } from "axios";
import Services from "../services";
import { Data } from "../types";

export async function register(data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/api/register", data);
  return res;
}

export async function createGameRole(data: {
  serverId: number;
  xinFaId: number;
  name: string;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/api/roles", data);
  return res;
}

export async function deleteGameRole(data: {
  id: number;
}): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.delete(`/api/roles/${data.id}`);
  return res;
}

export async function createTeam(data: {
  startAt: number;
  confirmAdvancedMinutes: number;
  clientTypeId: number;
  teamTypeId: number;
  member: {
    currentScore: number;
    maxScore: number;
    playDuration: number;
    gameRoleId: number;
  };
}): Promise<AxiosResponse<Data<CreatedTeam>>> {
  const res = await Services.localService.post(`/api/teams`, data);
  return res;
}

export async function createTeamMember(
  teamId: number,
  data: {
    currentScore: number;
    maxScore: number;
    playDuration: number;
    gameRoleId: number;
  }
): Promise<AxiosResponse<Data<CreatedTeamMember>>> {
  const res = await Services.localService.post(
    `/api/teams/${teamId}/members`,
    data
  );
  return res;
}

export async function exitTeam(teamId: number): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.delete(
    `/api/teams/${teamId}/members`
  );
  return res;
}

export async function confirmTeam(
  teamId: number
): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post(`/api/teams/${teamId}/confirm`);
  return res;
}
