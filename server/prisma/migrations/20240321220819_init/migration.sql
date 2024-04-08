/*
  Warnings:

  - You are about to drop the `CalendarDays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CalendarDays";

-- CreateTable
CREATE TABLE "Calendar" (
    "dateString" VARCHAR(8) NOT NULL,
    "moneySpent" INTEGER NOT NULL,
    "background" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Calendar_pkey" PRIMARY KEY ("dateString")
);
