/*
  Warnings:

  - A unique constraint covering the columns `[signature]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guest_signature_key" ON "Guest"("signature");
