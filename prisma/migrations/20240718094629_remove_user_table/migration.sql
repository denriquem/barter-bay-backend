/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_offeredById_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_requestedFromId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "ownerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "offeredById" SET DATA TYPE TEXT,
ALTER COLUMN "requestedFromId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";
