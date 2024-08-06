/*
  Warnings:

  - A unique constraint covering the columns `[course_id,position]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_id,position]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_course_id_position_key" ON "Chapter"("course_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_chapter_id_position_key" ON "Lesson"("chapter_id", "position");
