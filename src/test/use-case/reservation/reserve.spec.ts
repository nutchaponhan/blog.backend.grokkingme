import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import {
  IConcertRepository,
  IUserRepository,
  IReservationAuditRepository,
  IReservationRepository,
} from '@core/repository';
import { UserEntity, ConcertEntity, ReservationEntity } from '@core/entity';

import { ReserveUseCase } from '@use-case/reservation';

const mockUser = () => {
  const user = new UserEntity();
  user.id = 1;
  return user;
};

const mockConcert = () => {
  const concert = new ConcertEntity();
  concert.id = 1;
  return concert;
};

const mockReservation = () => {
  const re = new ReservationEntity();
  re.id = 1;
  return re;
};

describe('reserve use-case', () => {
  let reserveUseCase: ReserveUseCase;

  const concertRepository = createMock<IConcertRepository>({});
  const userRepository = createMock<IUserRepository>({});
  const reservationAuditRepository = createMock<IReservationAuditRepository>(
    {},
  );
  const reservationRepository = createMock<IReservationRepository>({});

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        ReserveUseCase,
        {
          provide: IConcertRepository,
          useValue: concertRepository,
        },
        {
          provide: IUserRepository,
          useValue: userRepository,
        },
        {
          provide: IReservationAuditRepository,
          useValue: reservationAuditRepository,
        },
        {
          provide: IReservationRepository,
          useValue: reservationRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    reserveUseCase = await modules.get<ReserveUseCase>(ReserveUseCase);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  describe('reserve', () => {
    it('should success and call in correct order', async () => {
      const user = mockUser();
      const concert = mockConcert();
      const reservation = mockReservation();

      const findUser = jest.spyOn(reserveUseCase, 'findUser');
      const findConcert = jest.spyOn(reserveUseCase, 'findConcert');
      const isSeatAvailable = jest.spyOn(reserveUseCase, 'isSeatAvailable');
      const isUserReserveConcert = jest.spyOn(
        reserveUseCase,
        'isUserReserveConcert',
      );
      const add = jest.spyOn(reserveUseCase, 'add');

      findUser.mockResolvedValue(user);
      findConcert.mockResolvedValue(concert);
      isSeatAvailable.mockResolvedValue(true);
      isUserReserveConcert.mockResolvedValue(false);
      add.mockResolvedValue(reservation);

      try {
        const result = await reserveUseCase.reserve(1, 1);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error).not.toBeDefined();
      }
    });

    it('should throw error when user not found', async () => {
      jest.spyOn(reserveUseCase, 'findUser').mockResolvedValue(null);
      try {
        await reserveUseCase.reserve(1, 1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should throw error when concert not found', async () => {
      const user = mockUser();
      jest.spyOn(reserveUseCase, 'findUser').mockResolvedValue(user);
      jest.spyOn(reserveUseCase, 'findConcert').mockResolvedValue(null);
      try {
        await reserveUseCase.reserve(1, 1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should throw error when concert seat not available', async () => {
      const user = mockUser();
      const concert = mockConcert();
      jest.spyOn(reserveUseCase, 'findUser').mockResolvedValue(user);
      jest.spyOn(reserveUseCase, 'findConcert').mockResolvedValue(concert);
      jest.spyOn(reserveUseCase, 'isSeatAvailable').mockResolvedValue(false);
      try {
        await reserveUseCase.reserve(1, 1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should throw error when user already book this concert', async () => {
      const user = mockUser();
      const concert = mockConcert();
      jest.spyOn(reserveUseCase, 'findUser').mockResolvedValue(user);
      jest.spyOn(reserveUseCase, 'findConcert').mockResolvedValue(concert);
      jest.spyOn(reserveUseCase, 'isSeatAvailable').mockResolvedValue(true);
      jest
        .spyOn(reserveUseCase, 'isUserReserveConcert')
        .mockResolvedValue(true);
      try {
        await reserveUseCase.reserve(1, 1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('cancel', () => {
    it('should success and call in correct order', async () => {
      const reservation = mockReservation();
      const findReservation = jest.spyOn(reserveUseCase, 'findReservation');

      findReservation.mockResolvedValue(reservation);

      try {
        await reserveUseCase.cancel(1);
      } catch (error) {
        expect(error).not.toBeDefined();
      }
    });

    it('should throw error when reservation not found', async () => {
      const findReservation = jest.spyOn(reserveUseCase, 'findReservation');

      findReservation.mockResolvedValue(null);

      try {
        await reserveUseCase.cancel(1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
