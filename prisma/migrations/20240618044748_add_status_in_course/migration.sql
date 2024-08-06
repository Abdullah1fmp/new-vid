-- CreateEnum
CREATE TYPE "Course_status" AS ENUM ('PUBLISHED', 'DRAFT');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "status" "Course_status" NOT NULL DEFAULT 'DRAFT';
