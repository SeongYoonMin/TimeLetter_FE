/*
  Warnings:

  - Added the required column `unique_id` to the `Capsuler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Capsuler" ADD COLUMN     "unique_id" TEXT NOT NULL;
