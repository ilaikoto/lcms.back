/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fullName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('ADMIN', 'LAWYER', 'STAFF');

-- AlterTable
ALTER TABLE "auth"."users" ADD COLUMN     "fullName" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "auth"."Role" NOT NULL DEFAULT 'STAFF';
