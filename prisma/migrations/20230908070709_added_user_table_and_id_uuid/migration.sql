/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Audio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Schools` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Test` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_TestId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Admin_id_seq";

-- AlterTable
ALTER TABLE "Audio" DROP CONSTRAINT "Audio_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "TestId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Audio_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Audio_id_seq";

-- AlterTable
ALTER TABLE "Schools" DROP CONSTRAINT "Schools_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Schools_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schools_id_seq";

-- AlterTable
ALTER TABLE "Test" DROP CONSTRAINT "Test_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Test_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Test_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_TestId_fkey" FOREIGN KEY ("TestId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
