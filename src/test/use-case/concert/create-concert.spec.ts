import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { IConcertRepository, IUserRepository } from '@core/repository';
import { CreateConcertDto } from '@core/dto';
import { UserEntity } from '@core/entity';

import { CreateConcertUseCase } from '@use-case/concert';

describe('find-surveys use-case', () => {
  let createConcertUseCase: CreateConcertUseCase;

  const concertRepository = createMock<IConcertRepository>({
    create: jest.fn().mockImplementation((d) => ({ ...d })),
  });

  const userRepository = createMock<IUserRepository>({});

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        CreateConcertUseCase,
        {
          provide: IConcertRepository,
          useValue: concertRepository,
        },
        {
          provide: IUserRepository,
          useValue: userRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    createConcertUseCase =
      await modules.get<CreateConcertUseCase>(CreateConcertUseCase);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be called in correct step', async () => {
    const findAdmin = jest.spyOn(createConcertUseCase, 'findAdmin');
    const createConcert = jest.spyOn(concertRepository, 'create');

    const user = new UserEntity();
    user.id = 1;
    findAdmin.mockResolvedValue(user);

    const data = new CreateConcertDto();
    await createConcertUseCase.create(data);

    expect(findAdmin).toHaveBeenCalledTimes(1);
    expect(createConcert).toHaveBeenCalledTimes(1);
  });

  it('should throw error when data dto not complete', async () => {
    try {
      const data = new CreateConcertDto();
      await createConcertUseCase.create(data);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should create success when admin was found', async () => {
    try {
      const data = new CreateConcertDto();
      data.name = 'test';
      data.description = 'test';
      data.seat = 100;
      data.createdById = 1;

      const user = new UserEntity();
      user.id = 1;

      jest.spyOn(createConcertUseCase, 'findAdmin').mockResolvedValue(user);

      const result = await createConcertUseCase.create(data);

      expect(result).toEqual(data);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });
});
