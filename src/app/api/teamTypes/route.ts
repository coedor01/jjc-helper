import { fetchTeamTypes } from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await fetchTeamTypes(prisma);
  return NextResponse.json({ ok: true, data: items });
}
