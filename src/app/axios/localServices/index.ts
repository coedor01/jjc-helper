import { AxiosResponse } from "axios";
import Services from "../services";
import { Data } from "../types";
import { RoomCreateRequest } from "@/app/api/rooms/route";

export async function createRoom(
  data: RoomCreateRequest
): Promise<AxiosResponse<Data<{ id: number }>>> {
  const res = await Services.localService.post("/api/rooms", data);
  return res;
}
