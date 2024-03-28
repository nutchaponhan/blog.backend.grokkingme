/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider_type_key" ON "Provider"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Role_title_key" ON "Role"("title");
