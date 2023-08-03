-- CreateTable
CREATE TABLE "Schools" (
    "id" SERIAL NOT NULL,
    "schoolName" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "expireStart" TIMESTAMP(3) NOT NULL,
    "schoolCode" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "salesRep" TEXT NOT NULL DEFAULT 'null',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Url" TEXT NOT NULL,
    "TestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schools_schoolName_key" ON "Schools"("schoolName");

-- CreateIndex
CREATE UNIQUE INDEX "Schools_schoolCode_key" ON "Schools"("schoolCode");

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_TestId_fkey" FOREIGN KEY ("TestId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
