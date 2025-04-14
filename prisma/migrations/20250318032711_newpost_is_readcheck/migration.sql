/*
  Warnings:

  - You are about to drop the column `new_post` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "new_post",
ALTER COLUMN "read_check" SET DEFAULT false;
