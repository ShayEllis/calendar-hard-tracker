/*
  Warnings:

  - The primary key for the `CalendarDays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CalendarDays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CalendarDays" DROP CONSTRAINT "CalendarDays_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CalendarDays_pkey" PRIMARY KEY ("dateString");
