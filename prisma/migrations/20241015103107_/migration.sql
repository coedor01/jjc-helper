-- CreateTable
CREATE TABLE "XinFa" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(1023) NOT NULL,

    CONSTRAINT "XinFa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameRole" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "xinFaId" INTEGER NOT NULL,
    "serverId" INTEGER NOT NULL,

    CONSTRAINT "GameRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "startAt" INTEGER NOT NULL,
    "confirmAdvancedMinutes" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamTypeId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamType" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "maxMemberCount" INTEGER NOT NULL,

    CONSTRAINT "TeamType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "currentScore" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "playDuration" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "gameRoleId" INTEGER NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameRole" ADD CONSTRAINT "GameRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRole" ADD CONSTRAINT "GameRole_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRole" ADD CONSTRAINT "GameRole_xinFaId_fkey" FOREIGN KEY ("xinFaId") REFERENCES "XinFa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamTypeId_fkey" FOREIGN KEY ("teamTypeId") REFERENCES "TeamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_gameRoleId_fkey" FOREIGN KEY ("gameRoleId") REFERENCES "GameRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
