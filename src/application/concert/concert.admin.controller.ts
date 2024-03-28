import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';

import {
  CreateConcertUseCase,
  ShowConcertsUseCase,
  DeleteConcertUseCase,
  MetaDataConcert,
} from '@src/use-case';
import { CreateConcertDto, DeleteConcertDto } from '@src/core/dto';

@Controller({ path: '/api/admin/concerts' })
export class ConcertAdminController {
  constructor(
    private showConcertsUseCase: ShowConcertsUseCase,
    private createConcertUseCase: CreateConcertUseCase,
    private deleteConcertUseCase: DeleteConcertUseCase,
    private metaDataConcert: MetaDataConcert,
  ) {}

  @Transactional()
  @Get()
  async showConcerts(): Promise<any> {
    return this.showConcertsUseCase.getAllConcerts();
  }

  @Transactional()
  @Get('/meta')
  async getConcertMetaData(): Promise<{
    totalSeat: number;
    totalReserve: number;
    totalCancel: number;
  }> {
    return this.metaDataConcert.getMetaData();
  }

  @Transactional()
  @Post()
  async createConcert(@Body() concertDto: CreateConcertDto): Promise<any> {
    const newConcert = await this.createConcertUseCase.create(concertDto);
    return {
      id: newConcert.id,
      message: 'created success',
    };
  }

  @Transactional()
  @Delete(':id')
  async deleteConcert(@Param() params: DeleteConcertDto): Promise<any> {
    const targetId = params.id;
    const deletedItem = await this.deleteConcertUseCase.delete(targetId);
    return {
      id: deletedItem.id,
      message: 'deleted success',
    };
  }
}
