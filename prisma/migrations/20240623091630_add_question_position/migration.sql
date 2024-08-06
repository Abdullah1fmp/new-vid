/*
  Warnings:

  - A unique constraint covering the columns `[quiz_id,position]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_quiz_id_position_key" ON "Question"("quiz_id", "position");
