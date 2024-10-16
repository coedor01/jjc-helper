/*
  Warnings:

  - Added the required column `clientType` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "clientType" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
