/*
  Warnings:

  - You are about to drop the column `ribbon` on the `Capsuler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Capsuler" DROP COLUMN "ribbon",
ADD COLUMN     "capsule" TEXT;
