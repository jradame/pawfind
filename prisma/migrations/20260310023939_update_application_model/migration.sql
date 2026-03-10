/*
  Warnings:

  - Made the column `hasYard` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasOtherPets` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "activityLevel" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "hoursAlonePerDay" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "isRenting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otherPetsDescription" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "hasYard" SET NOT NULL,
ALTER COLUMN "hasYard" SET DEFAULT false,
ALTER COLUMN "hasOtherPets" SET NOT NULL,
ALTER COLUMN "hasOtherPets" SET DEFAULT false;
