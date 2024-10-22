import { deleteGameRole, getSessionUser } from "@/app/core/v1/services";
import prisma from "@/client";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id) as number;

  const user = await getSessionUser(prisma);
  if (user) {
    await deleteGameRole(prisma, { id });
    return Response.json({
      ok: true,
    });
  }
  return NextResponse.json(
    { ok: false, error: "用户信息有误" },
    { status: 200 }
  );
}
