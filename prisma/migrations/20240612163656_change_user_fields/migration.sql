/*
  Warnings:

  - You are about to drop the column `cover` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "cover",
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "interests",
DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "preferences" TEXT[],
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
