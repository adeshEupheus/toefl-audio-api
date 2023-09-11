/*
  Warnings:

  - You are about to drop the column `grade` on the `User` table. All the data in the column will be lost.
  - Added the required column `gradeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "grade",
ADD COLUMN     "gradeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
