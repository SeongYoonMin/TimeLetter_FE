import prisma from "@/lib/prisma";
import { actionEncrypt } from "@/lib/crypto";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("id") as string;
  const password = formData.get("password") as string;
  const background = formData.get("background") as string;
  const capsule = formData.get("capsule") as string;
  const nickName = formData.get("nickname") as string;
  const encryptPassword = await actionEncrypt(password);
  const uniqueId = await actionEncrypt(userId);

  const checkUser = await prisma.capsuler.findUnique({
    where: {
      userId,
    },
  });
  if (checkUser) {
    return new Response(`이미 존재하는 아이디입니다.`, {
      headers: { "content-type": "application/json" },
      status: 409,
    });
  }

  const register = await prisma.capsuler.create({
    data: {
      uniqueId,
      userId,
      password: encryptPassword,
      background,
      capsule,
      nickName,
    },
  });
  return new Response(
    `성공적으로 ${register.nickName}의 계정이 등록되었습니다.`,
    {
      headers: { "content-type": "application/json" },
      status: 201,
    }
  );
}
