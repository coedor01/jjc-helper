/*
  Warnings:

  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBase` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- DropTable
DROP TABLE "Guest";

-- DropTable
DROP TABLE "UserBase";
