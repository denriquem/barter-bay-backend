/*
  Warnings:

  - You are about to drop the column `offerId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_itemId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "offerId";

-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "commentId" INTEGER,
ALTER COLUMN "itemId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
