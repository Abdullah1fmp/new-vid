/*
  Warnings:

  - A unique constraint covering the columns `[user_id,course_id,chapter_id,lesson_id,status]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "progress_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "status" "Progress_status" NOT NULL DEFAULT 'ONGOING';

-- CreateIndex
CREATE UNIQUE INDEX "Progress_user_id_course_id_chapter_id_lesson_id_status_key" ON "Progress"("user_id", "course_id", "chapter_id", "lesson_id", "status");
