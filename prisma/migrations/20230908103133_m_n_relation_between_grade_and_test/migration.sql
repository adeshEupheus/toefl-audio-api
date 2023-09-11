-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GradeToTest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Grade_grade_key" ON "Grade"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "_GradeToTest_AB_unique" ON "_GradeToTest"("A", "B");

-- CreateIndex
CREATE INDEX "_GradeToTest_B_index" ON "_GradeToTest"("B");

-- AddForeignKey
ALTER TABLE "_GradeToTest" ADD CONSTRAINT "_GradeToTest_A_fkey" FOREIGN KEY ("A") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToTest" ADD CONSTRAINT "_GradeToTest_B_fkey" FOREIGN KEY ("B") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
