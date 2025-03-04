-- CreateTable
CREATE TABLE "Capsuler" (
    "id" SERIAL NOT NULL,
    "nick_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "background" TEXT,
    "ribbon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Capsuler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "post_title" TEXT NOT NULL,
    "post_content" TEXT NOT NULL,
    "post_last_content" TEXT NOT NULL,
    "post_user_nick_name" TEXT NOT NULL,
    "first_view" TEXT NOT NULL,
    "latest_view" TEXT NOT NULL,
    "favorite_view" TEXT NOT NULL,
    "read_check" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Capsuler_user_id_key" ON "Capsuler"("user_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Capsuler"("id") ON DELETE CASCADE ON UPDATE CASCADE;
