/* eslint-disable */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsDTO, UpdateProfessionalJobTypesDTO } from 'src/modules/professionals/professionals.dto';

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

  @Put('/:id/updateJobTypes/')
  async updateJobTypes(
    @Param('id') userId: string,
    @Body() data: UpdateProfessionalJobTypesDTO,
  ) {
    return this.professionalsService.updateJobTypes(parseInt(userId), data.jobType);
  }
}
