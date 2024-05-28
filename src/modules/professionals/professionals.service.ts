/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProfessionalsDTO } from 'src/modules/professionals/professionals.dto';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProfessionalsDTO) {
    if (!data.userId) {
      throw new Error('Usuário não informado');
    }

    if (!data.profession) {
      throw new Error('Profissão não informada');
    }

    const userExists = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    if (userExists.role != 2) {
      throw new Error('Usuário não é um profissional');
    }

    const professional = await this.prisma.professional.create({
      data: {
        userId: data.userId,
        profession: data.profession,
      },
    });

    return professional;
  }

  async findAll() {
    return this.prisma.professional.findMany();
  }

  async updateJobTypes(professionalId: number, jobType: string) {
    if (!professionalId || !jobType) {
      throw new Error('Dados inválidos');
    }

    const professional = await this.prisma.professional.update({
      where: { id: professionalId },
      data: {
        jobType: jobType,
      },
    });

    return professional;
  }
}
