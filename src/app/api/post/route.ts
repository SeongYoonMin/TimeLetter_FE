import prisma from "@/lib/prisma";

export async function GET() {
  const post = await prisma.post.findMany();
  if (!post || post.length === 0) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(post), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
