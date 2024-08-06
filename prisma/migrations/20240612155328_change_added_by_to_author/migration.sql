/*
  Warnings:

  - You are about to drop the column `addedBy` on the `Course` table. All the data in the column will be lost.
  - Added the required column `author` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_addedBy_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "addedBy",
ADD COLUMN     "author" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
