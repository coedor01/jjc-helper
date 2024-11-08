/*
  Warnings:

  - You are about to drop the column `uid` on the `UserRoomRelation` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserRoomRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server` to the `UserRoomRelation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRoomRelation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "server" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "UserRoomRelation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserRoomRelation" ("createAt", "id", "roomId") SELECT "createAt", "id", "roomId" FROM "UserRoomRelation";
DROP TABLE "UserRoomRelation";
ALTER TABLE "new_UserRoomRelation" RENAME TO "UserRoomRelation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
