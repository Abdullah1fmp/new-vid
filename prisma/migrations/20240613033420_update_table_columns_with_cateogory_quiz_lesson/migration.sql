/*
  Warnings:

  - You are about to drop the column `courseId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `introVideo` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `documentUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `isDownloadable` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Lesson` table. All the data in the column will be lost.
  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Progress` table. All the data in the column will be lost.
  - The `status` column on the `Progress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,course_id]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapter_id]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lesson_id]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `course_id` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapter_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `is_correct` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_id` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapter_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Lesson_type" AS ENUM ('VIDEO', 'DOCUMENT', 'QUIZ');

-- CreateEnum
CREATE TYPE "Progress_status" AS ENUM ('ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Chapter_status" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateEnum
CREATE TYPE "Answer_type" AS ENUM ('SINGLE', 'MULTIPLE');

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_author_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_enrollmentId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropIndex
DROP INDEX "Enrollment_userId_courseId_key";

-- DropIndex
DROP INDEX "Lesson_chapterId_key";

-- DropIndex
DROP INDEX "Quiz_lessonId_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "isFree",
DROP COLUMN "updatedAt",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Chapter_status" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "author",
DROP COLUMN "createdAt",
DROP COLUMN "introVideo",
DROP COLUMN "updatedAt",
DROP COLUMN "visibility",
ADD COLUMN     "access_by_user_group_id" TEXT,
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "difficulty" "Difficulty" NOT NULL,
ADD COLUMN     "intro_video" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "chapterId",
DROP COLUMN "createdAt",
DROP COLUMN "documentUrl",
DROP COLUMN "isDownloadable",
DROP COLUMN "updatedAt",
DROP COLUMN "videoUrl",
ADD COLUMN     "chapter_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document_url" TEXT,
ADD COLUMN     "is_downloadable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "video_url" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "Lesson_type" NOT NULL;

-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "isCorrect",
DROP COLUMN "questionId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_correct" BOOLEAN NOT NULL,
ADD COLUMN     "question_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Option_id_seq";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "enrollmentId",
DROP COLUMN "lessonId",
DROP COLUMN "score",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "chapter_id" TEXT NOT NULL,
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enrollment_id" TEXT NOT NULL,
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Progress_status" NOT NULL DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "createdAt",
DROP COLUMN "quizId",
DROP COLUMN "updatedAt",
ADD COLUMN     "answer_type" "Answer_type" NOT NULL DEFAULT 'SINGLE',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quiz_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "createdAt",
DROP COLUMN "lessonId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "roles" "Role"[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_group_id" TEXT;

-- DropTable
DROP TABLE "Invitation";

-- DropEnum
DROP TYPE "InvitationStatus";

-- DropEnum
DROP TYPE "LessonType";

-- DropEnum
DROP TYPE "ProgressStatus";

-- DropEnum
DROP TYPE "Visibility";

-- CreateTable
CREATE TABLE "User_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course_to_category" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_to_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_user_id_course_id_key" ON "Enrollment"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_chapter_id_key" ON "Lesson"("chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_lesson_id_key" ON "Quiz"("lesson_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "User_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_access_by_user_group_id_fkey" FOREIGN KEY ("access_by_user_group_id") REFERENCES "User_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_to_category" ADD CONSTRAINT "Course_to_category_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_to_category" ADD CONSTRAINT "Course_to_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
