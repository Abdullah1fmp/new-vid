-- CreateEnum
CREATE TYPE "Payment_status" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "payment_status" "Payment_status" NOT NULL DEFAULT 'UNPAID';
