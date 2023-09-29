/*
  Warnings:

  - You are about to drop the column `authoId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authoId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "authoId",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
