import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class JobTypeService {
  constructor(private prisma: PrismaService) {}

  async create(name: string) {
    if (!name) {
      throw new Error('Tipo de serviço sem nome')
    }

    const jobTypeExists = await this.prisma.jobType.findFirst({
      where: {
        name: name
      },
    })

    if (jobTypeExists) {
      throw new Error('Tipo de serviço já existe!');
    }

    const jobType = await this.prisma.jobType.create({
      data: {
        name,
      },
    })

    return jobType
  }

  async getAll() {
    return this.prisma.jobType.findMany();
  }
}