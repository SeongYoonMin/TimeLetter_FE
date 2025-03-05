import prisma from "@/lib/prisma";
import { actionEncrypt } from "@/lib/crypto";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;
  const background = formData.get("background") as string;
  const ribbon = formData.get("ribbon") as string;
  const nickName = formData.get("nickName") as string;

  const encryptPassword = await actionEncrypt(password);
  const checkUser = await prisma.capsuler.findUnique({
    where: {
      userId,
    },
  });
  if (checkUser) {
    return new Response("Already exists", { status: 409 });
  }
  const register = await prisma.capsuler.create({
    data: {
      userId,
      password: encryptPassword,
      background,
      ribbon,
      nickName,
    },
  });
  return new Response(JSON.stringify(register), {
    headers: { "content-type": "application/json" },
    status: 201,
  });
}
