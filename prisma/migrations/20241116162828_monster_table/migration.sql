/*
  Warnings:

  - You are about to drop the column `gainPerClick` on the `UserStat` table. All the data in the column will be lost.
  - You are about to drop the column `gainPerSecond` on the `UserStat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserResource" ADD COLUMN     "runes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserStat" DROP COLUMN "gainPerClick",
DROP COLUMN "gainPerSecond",
ADD COLUMN     "currentMonsterLevel" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "dmgPerClick" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "soulsPer10Second" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "maxHp" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);
