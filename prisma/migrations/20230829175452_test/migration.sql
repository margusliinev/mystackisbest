-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;