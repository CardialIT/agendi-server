import { Controller, Post, Get, Body } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from '@prisma/client';

@Controller('types')
export class TypeController {
  constructor(private readonly TypeService: TypeService) {}

  @Post('/create')
  async createType(@Body('name') name: string): Promise<Type> {
    return this.TypeService.create(name);
  }

  @Get('/listAll')
  async getAllTypes(): Promise<Type[]> {
    return this.TypeService.getAll();
  }
}