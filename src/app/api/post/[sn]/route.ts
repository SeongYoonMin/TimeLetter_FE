import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sn: string }> }
) {
  const { sn } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(sn),
    },
  });
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(post), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
