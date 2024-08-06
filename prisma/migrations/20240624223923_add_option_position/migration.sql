/*
  Warnings:

  - A unique constraint covering the columns `[question_id,position]` on the table `Option` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Option_question_id_position_key" ON "Option"("question_id", "position");
