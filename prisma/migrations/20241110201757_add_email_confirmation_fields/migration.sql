-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;
