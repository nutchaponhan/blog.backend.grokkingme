import { Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';

import {
  IConcertRepository,
  IReservationAuditRepository,
} from '@src/core/repository';

type MetaData = {
  totalSeat: number;
  totalReserve: number;
  totalCancel: number;
};

@Injectable()
export class MetaDataConcert {
  constructor(
    private concertRepo: IConcertRepository,
    private reservationAuditRepo: IReservationAuditRepository,
  ) {}

  async countConcertSeat(): Promise<number> {
    const tx = await this.concertRepo.getTx();

    const aggregations = await tx.aggregate({
      _sum: {
        seat: true,
      },
    });

    return aggregations._sum.seat || 0;
  }

  async countReservations(): Promise<{
    totalReserve: number;
    totalCancel: number;
  }> {
    const tx = await this.reservationAuditRepo.getTx();
    const reservationAuditCount = await tx.groupBy({
      by: ['action'],
      _count: { id: true },
    });

    let reserveCount = 0;
    let cancelCount = 0;

    for (const audit of reservationAuditCount) {
      const { action, _count } = audit;

      if (action === Action.RESERVE) {
        reserveCount = _count.id;
      }

      if (action === Action.CANCEL) {
        cancelCount = _count.id;
      }
    }

    return {
      totalReserve: reserveCount,
      totalCancel: cancelCount,
    };
  }

  async countTotalCancel(): Promise<number> {
    return 0;
  }

  async getMetaData(): Promise<MetaData> {
    const totalSeat = await this.countConcertSeat();
    const totalReservations = await this.countReservations();

    return {
      totalSeat: totalSeat,
      totalReserve: totalReservations.totalReserve,
      totalCancel: totalReservations.totalCancel,
    };
  }
}
