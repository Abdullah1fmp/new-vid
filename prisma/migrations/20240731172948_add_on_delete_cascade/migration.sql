/*
  Warnings:

  - A unique constraint covering the columns `[user_id,lesson_id,enrollement_id]` on the table `Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_course_id_fkey";

-- DropIndex
DROP INDEX "Progress_user_id_lesson_id_key";

-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "enrollement_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Progress_user_id_lesson_id_enrollement_id_key" ON "Progress"("user_id", "lesson_id", "enrollement_id");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_enrollement_id_fkey" FOREIGN KEY ("enrollement_id") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
