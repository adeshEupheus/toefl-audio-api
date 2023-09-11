/*
  Warnings:

  - Added the required column `expireTime` to the `RestPasswordToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RestPasswordToken" ADD COLUMN     "expireTime" TIMESTAMP(3) NOT NULL;
