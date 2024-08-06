/*
  Warnings:

  - The values [STUDENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `addedBy` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Changed the column `role` on the `User` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'TEACHER', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new"[] USING ("role"::text::"Role_new"[]);
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "addedBy" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "role" SET DATA TYPE "Role"[];

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
