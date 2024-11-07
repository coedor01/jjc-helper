-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "members" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_number_key" ON "Room"("number");
