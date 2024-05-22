import { Controller, Post, Get, Body } from '@nestjs/common';
import { JobTypeService } from './type.service';
import { JobType } from '@prisma/client';

@Controller('job-types')
export class JobTypeController {
  constructor(private readonly JobTypeService: JobTypeService) {}

  @Post('/create')
  async createJobType(@Body('name') name: string): Promise<JobType> {
    return this.JobTypeService.create(name);
  }

  @Get('/listAll')
  async getAllJobTypes(): Promise<JobType[]> {
    return this.JobTypeService.getAll();
  }
}