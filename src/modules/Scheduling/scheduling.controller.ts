/* eslint-disable */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingDTO } from './scheduling.dto';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  async create(@Body() data: SchedulingDTO) {
    return this.schedulingService.create(data);
  }

  @Get()
  async findAll() {
    return this.schedulingService.findAll();
  }
}
