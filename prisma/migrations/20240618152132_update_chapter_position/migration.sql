/*
  Warnings:

  - A unique constraint covering the columns `[course_id]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course_to_category" DROP CONSTRAINT "Course_to_category_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Course_to_category" DROP CONSTRAINT "Course_to_category_course_id_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_course_id_key" ON "Chapter"("course_id");

-- AddForeignKey
ALTER TABLE "Course_to_category" ADD CONSTRAINT "Course_to_category_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_to_category" ADD CONSTRAINT "Course_to_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
