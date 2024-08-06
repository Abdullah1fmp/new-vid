/*
  Warnings:

  - A unique constraint covering the columns `[user_id,enrollment_id]` on the table `Certificates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Certificates_user_id_enrollment_id_key" ON "Certificates"("user_id", "enrollment_id");
