-- CreateTable
CREATE TABLE "CalendarDays" (
    "id" SERIAL NOT NULL,
    "dateString" VARCHAR(8) NOT NULL,
    "moneySpent" INTEGER NOT NULL,
    "background" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CalendarDays_pkey" PRIMARY KEY ("id")
);
