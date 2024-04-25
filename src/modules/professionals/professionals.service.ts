/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProfessionalsDTO } from 'src/modules/professionals/professionals.dto';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProfessionalsDTO) {
    const professionalExists = await this.prisma.professional.findFirst({
      where: {
        nameProfessional: data.nameProfessional,
        profession: data.profession,
      },
    });

    if (professionalExists) {
      throw new Error('Agendamento já existe!');
    }

    if (!data.nameProfessional || !data.profession) {
      throw new Error('Dados do Profissional incompletos!');
    }

    const professional = await this.prisma.professional.create({
      data: {
        nameProfessional: data.nameProfessional,
        profession: data.profession,
      },
    });

    return professional;
  }

  async findAll() {
    return this.prisma.professional.findMany();
  }
}
