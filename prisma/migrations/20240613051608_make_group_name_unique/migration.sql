/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User_group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- CreateIndex
CREATE UNIQUE INDEX "User_group_name_key" ON "User_group"("name");
