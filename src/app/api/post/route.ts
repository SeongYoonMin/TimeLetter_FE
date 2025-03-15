import { validateAuthUniqueID } from "@/lib/auth";
import { actionDecrypt } from "@/lib/crypto";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const authUniqueId = req.headers.get("authorization");
  if (!authUniqueId || !authUniqueId.startsWith("Bearer ")) {
    return new Response("잘못된 접근입니다. 다시 로그인 바랍니다.", {
      status: 401,
    });
  }
  const authorization = await validateAuthUniqueID(authUniqueId);
  if (!authorization) {
    return new Response("잘못된 접근입니다. 다시 로그인 바랍니다.", {
      status: 401,
    });
  }
  const decryptId = await actionDecrypt(authUniqueId.replace("Bearer ", ""));
  const [postCount, newPostCount] = await Promise.all([
    prisma.post.count({
      where: {
        authorId: decryptId,
      },
    }),
    prisma.post.count({
      where: {
        authorId: decryptId,
        newPost: true,
      },
    }),
  ]);
  if (!postCount) {
    return new Response(JSON.stringify({ postCount, newPostCount }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }
  return new Response(JSON.stringify({ postCount, newPostCount }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
