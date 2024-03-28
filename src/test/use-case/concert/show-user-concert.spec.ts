import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { IConcertRepository, IReservationRepository } from '@core/repository';
import { ConcertEntity, ReservationEntity } from '@core/entity';

import { ShowUserConcertsUseCase } from '@use-case/concert';

describe('show user concert use-case', () => {
  let showUserConcertsUseCase: ShowUserConcertsUseCase;

  const concertRepository = createMock<IConcertRepository>({});

  const reservationRepository = createMock<IReservationRepository>({});

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        ShowUserConcertsUseCase,
        {
          provide: IConcertRepository,
          useValue: concertRepository,
        },
        {
          provide: IReservationRepository,
          useValue: reservationRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    showUserConcertsUseCase = await modules.get<ShowUserConcertsUseCase>(
      ShowUserConcertsUseCase,
    );
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be called in correct step', async () => {
    const getConcerts = jest.spyOn(showUserConcertsUseCase, 'getConcerts');
    const getReservations = jest.spyOn(
      showUserConcertsUseCase,
      'getReservations',
    );
    const mapUserReservation = jest.spyOn(
      showUserConcertsUseCase,
      'mapUserReservation',
    );

    await showUserConcertsUseCase.getAllConcerts(1);

    expect(getConcerts).toHaveBeenCalledTimes(1);
    expect(getReservations).toHaveBeenCalledTimes(1);
    expect(mapUserReservation).toHaveBeenCalledTimes(1);
  });

  it('should return with isReserved and reservationId properties', async () => {
    const concert = new ConcertEntity();
    const reservation = new ReservationEntity();

    const getConcerts = jest.spyOn(showUserConcertsUseCase, 'getConcerts');
    const getReservations = jest.spyOn(
      showUserConcertsUseCase,
      'getReservations',
    );

    getConcerts.mockResolvedValue([concert]);
    getReservations.mockResolvedValue([reservation]);

    const result = await showUserConcertsUseCase.getAllConcerts(1);

    expect(result[0]).toHaveProperty('isReserved');
    expect(result[0]).toHaveProperty('reservationId');
  });
});
