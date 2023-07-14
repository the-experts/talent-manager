/*
  Warnings:

  - You are about to drop the `colleagues_skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "colleagues_skills" DROP CONSTRAINT "colleagues_skills_colleagueId_fkey";

-- DropForeignKey
ALTER TABLE "colleagues_skills" DROP CONSTRAINT "colleagues_skills_skillId_fkey";

-- DropTable
DROP TABLE "colleagues_skills";

-- CreateTable
CREATE TABLE "colleagues_skills" (
    "id" SERIAL NOT NULL,
    "colleagueId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "ability" INTEGER NOT NULL,
    "interest" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colleagues_skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "colleagues_skills" ADD CONSTRAINT "colleagues_skills_colleagueId_fkey" FOREIGN KEY ("colleagueId") REFERENCES "colleagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colleagues_skills" ADD CONSTRAINT "colleagues_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
