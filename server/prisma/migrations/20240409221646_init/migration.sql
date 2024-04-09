/*
  Warnings:

  - You are about to drop the column `background` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `moneySpent` on the `Calendar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "background",
DROP COLUMN "moneySpent",
ADD COLUMN     "diet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "indoorWorkout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "noAlcoholOrCheatMeal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oneGallonOfWater" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "outdoorWorkout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "progressPicture" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
