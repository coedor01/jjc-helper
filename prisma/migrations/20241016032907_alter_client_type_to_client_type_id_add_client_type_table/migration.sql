/*
  Warnings:

  - You are about to drop the column `clientType` on the `Team` table. All the data in the column will be lost.
  - Added the required column `clientTypeId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "clientType",
ADD COLUMN     "clientTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ClientType" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "ClientType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_clientTypeId_fkey" FOREIGN KEY ("clientTypeId") REFERENCES "ClientType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
