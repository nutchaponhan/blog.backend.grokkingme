-- DropForeignKey
ALTER TABLE "ReservationAudit" DROP CONSTRAINT "ReservationAudit_concertId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationAudit" DROP CONSTRAINT "ReservationAudit_userId_fkey";

-- AddForeignKey
ALTER TABLE "ReservationAudit" ADD CONSTRAINT "ReservationAudit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationAudit" ADD CONSTRAINT "ReservationAudit_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES "Concert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
