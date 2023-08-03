/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Test_category_key" ON "Test"("category");
