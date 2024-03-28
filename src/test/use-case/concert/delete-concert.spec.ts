import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { IConcertRepository, IReservationRepository } from '@core/repository';
import { ConcertEntity } from '@core/entity';

import { DeleteConcertUseCase } from '@use-case/concert';

const mockConcert = (): ConcertEntity => {
  const concert = new ConcertEntity();
  concert.id = 1;
  return concert;
};

describe('find-surveys use-case', () => {
  let deleteConcertUseCase: DeleteConcertUseCase;

  const concertRepository = createMock<IConcertRepository>({
    create: jest.fn().mockImplementation((d) => ({ ...d })),
  });

  const reservationRepository = createMock<IReservationRepository>({});

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        DeleteConcertUseCase,
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

    deleteConcertUseCase =
      await modules.get<DeleteConcertUseCase>(DeleteConcertUseCase);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be called in correct step', async () => {
    const findConcert = jest.spyOn(deleteConcertUseCase, 'findConcert');
    const canDeleteConcert = jest.spyOn(
      deleteConcertUseCase,
      'canDeleteConcert',
    );

    findConcert.mockResolvedValue(mockConcert());
    canDeleteConcert.mockResolvedValue(true);

    await deleteConcertUseCase.delete(1);

    expect(findConcert).toHaveBeenCalledTimes(1);
    expect(canDeleteConcert).toHaveBeenCalledTimes(1);
  });

  it('should throw error when concert not found', async () => {
    const findConcert = jest.spyOn(deleteConcertUseCase, 'findConcert');

    findConcert.mockResolvedValue(null);

    try {
      await deleteConcertUseCase.delete(1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw error when concert can not be deleted', async () => {
    const findConcert = jest.spyOn(deleteConcertUseCase, 'findConcert');
    const canDeleteConcert = jest.spyOn(
      deleteConcertUseCase,
      'canDeleteConcert',
    );

    findConcert.mockResolvedValue(mockConcert());
    canDeleteConcert.mockResolvedValue(false);

    try {
      await deleteConcertUseCase.delete(1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
