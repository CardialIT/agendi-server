import { Controller, Post, Get, Body } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from '@prisma/client';

@Controller()
export class TypeController {
  constructor(private readonly TypeService: TypeService) {}

  @Post('type')
  async createServiceType(@Body('name') name: string): Promise<Type> {
    return this.TypeService.createType(name);
  }

  @Get('types')
  async getAllServiceTypes(): Promise<Type[]> {
    return this.TypeService.getAllTypes();
  }
}