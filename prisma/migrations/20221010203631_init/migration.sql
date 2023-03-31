/*
  Warnings:

  - You are about to drop the `colleague` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "colleague";

-- CreateTable
CREATE TABLE "colleagues" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colleagues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colleagues_email_key" ON "colleagues"("email");
