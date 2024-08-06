-- CreateTable
CREATE TABLE "Certificates" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificates" ADD CONSTRAINT "Certificates_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
