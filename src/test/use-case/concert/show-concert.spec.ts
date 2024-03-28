import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { IConcertRepository } from '@core/repository';
import { ConcertEntity } from '@core/entity';

import { ShowConcertsUseCase } from '@use-case/concert';

const mockAllConcert = (): ConcertEntity[] => {
  const items = [{ id: 1 }, { id: 2 }];

  return items.map((i) => {
    const concert = new ConcertEntity();
    concert.id = i.id;
    return concert;
  });
};

describe('show concert use-case', () => {
  let showConcertsUseCase: ShowConcertsUseCase;

  const concertRepository = createMock<IConcertRepository>({
    findAll: jest.fn(),
  });

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        ShowConcertsUseCase,
        {
          provide: IConcertRepository,
          useValue: concertRepository,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    showConcertsUseCase =
      await modules.get<ShowConcertsUseCase>(ShowConcertsUseCase);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should return all data', async () => {
    const mocks = mockAllConcert();
    concertRepository.findAll.mockResolvedValue(mocks);

    const result = await showConcertsUseCase.getAllConcerts();
    expect(result).toHaveLength(mocks.length);
  });
});
