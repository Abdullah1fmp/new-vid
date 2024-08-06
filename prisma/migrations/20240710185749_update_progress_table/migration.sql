/*
  Warnings:

  - You are about to drop the column `chapter_id` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `enrollment_id` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,lesson_id]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_enrollment_id_fkey";

-- DropIndex
DROP INDEX "Progress_user_id_course_id_chapter_id_lesson_id_status_key";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "chapter_id",
DROP COLUMN "course_id",
DROP COLUMN "enrollment_id",
DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "Progress_user_id_lesson_id_key" ON "Progress"("user_id", "lesson_id");
