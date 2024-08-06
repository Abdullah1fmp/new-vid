-- CreateEnum
CREATE TYPE "lesson_status" AS ENUM ('PUBLISHED', 'DRAFT');

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "status" "lesson_status" NOT NULL DEFAULT 'DRAFT';
