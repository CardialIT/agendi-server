/* eslint-disable */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsDTO } from 'src/modules/professionals/professionals.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post('/create')
  async create(@Body() data: ProfessionalsDTO) {
    return this.professionalsService.create(data);
  }

  @Get('/listAll')
  async findAll() {
    return this.professionalsService.findAll();
  }
}
