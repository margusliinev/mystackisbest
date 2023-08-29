/*
  Warnings:

  - Made the column `createdAt` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;
