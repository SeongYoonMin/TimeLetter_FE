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
  const poster = await prisma.post.findMany({
    where: {
      authorId: decryptId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      postUserNickName: true,
      createdAt: true,
      readCheck: true,
    },
  });
  if (!poster) {
    return new Response("편지가 없습니다.", {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }
  return new Response(JSON.stringify(poster), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const userId = formData.get("userId") as string;
  const firstView = formData.get("firstView") as string;
  const lastView = formData.get("lastView") as string;
  const favoriteView = formData.get("favoriteView") as string;
  const postContent = formData.get("postContent") as string;
  const postLastContent = formData.get("postLastContent") as string;

  const decryptId = await actionDecrypt(userId);

  const checkUser = await prisma.capsuler.findFirst({
    where: {
      userId: decryptId,
    },
  });
  if (!checkUser) {
    return new Response("잘못된 접근입니다. 다시 로그인 바랍니다.", {
      status: 401,
    });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        postTitle: `${name}님의 편지 `,
        postContent,
        postLastContent,
        postUserNickName: name,
        firstView,
        latestView: lastView,
        favoriteView,
        authorId: decryptId,
      },
    });
    return new Response(`${newPost.postTitle}가 성공적으로 전송되었습니다.`, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("오류가 발생했습니다. 다시 시도해주세요.", {
      status: 500,
    });
  }
}
