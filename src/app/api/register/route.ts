import bcrypt from "bcrypt";

import prisma from "@/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ ok: true, data: user });
  } catch (error) {
    console.log(error, "REGISTERATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
