import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name) {
      throw new Error('Tipo de serviço sem nome')
    }

    const typeExists = await this.prisma.type.findFirst({
      where: {
        name: name
      },
    })

    if (typeExists) {
      throw new Error('Tipo de serviço já existe!');
    }

    const type = await this.prisma.type.create({
      data: {
        name,
      },
    })

    return type
  }

  async getAll() {
    return this.prisma.type.findMany();
  }
}