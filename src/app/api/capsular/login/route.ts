import prisma from "@/lib/prisma";
import { actionDecrypt } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;

  try {
    const checkUser = await prisma.capsuler.findUnique({
      where: {
        userId,
      },
    });
    if (!checkUser) {
      throw new Error(
        "아이디 혹은 비밀번호가 일치하지 않습니다. 다시 확인 바랍니다."
      );
    }

    const decryptPassword = await actionDecrypt(checkUser.password);
    if (password !== decryptPassword) {
      throw new Error(
        "아이디 혹은 비밀번호가 일치하지 않습니다. 다시 확인 바랍니다."
      );
    }
    return new Response(JSON.stringify(checkUser), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errors = error as Error;
    return NextResponse.json({ error: errors.message }, { status: 401 });
  }
}
