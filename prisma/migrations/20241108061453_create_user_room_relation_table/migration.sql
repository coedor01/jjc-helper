/*
  Warnings:

  - You are about to drop the column `members` on the `Room` table. All the data in the column will be lost.
  - Added the required column `createAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserRoomRelation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" TEXT NOT NULL,
    "createAt" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "UserRoomRelation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" INTEGER NOT NULL
);
INSERT INTO "new_Room" ("id", "number", "password") SELECT "id", "number", "password" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
