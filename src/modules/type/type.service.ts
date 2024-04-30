import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Type } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async createType(name: string): Promise<Type> {
    return this.prisma.type.create({
      data: {
        name,
      },
    });
  }
}