import prisma from "@/lib/prisma";
import { actionDecrypt } from "@/lib/crypto";

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;

  const checkUser = await prisma.capsuler.findUnique({
    where: {
      userId,
    },
  });
  if (!checkUser) {
    return new Response("Not found", { status: 404 });
  }
  const decryptPassword = await actionDecrypt(checkUser.password);
  if (password !== decryptPassword) {
    return new Response("Unauthorized", { status: 401 });
  }
  return new Response(JSON.stringify(checkUser), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}