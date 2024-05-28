/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { SchedulingDTO } from './scheduling.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async create(data: SchedulingDTO) {
    if (!data.clientId || !data.professionalId || !data.scheduleDate) {
      throw new Error('Dados do agendamento incompletos');
    }

    const clientExists = await this.prisma.client.findUnique({
      where: {
        id: data.clientId,
      },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado');
    }

    const professionalExists = await this.prisma.professional.findUnique({
      where: {
        id: data.professionalId,
      },
    });

    if (!professionalExists) {
      throw new Error('Profissional não encontrado');
    }

    const schedulingExists = await this.prisma.scheduling.findFirst({
      where: {
        clientId: data.clientId,
        professionalId: data.professionalId,
        jobType: professionalExists.jobType,
        scheduleDate: data.scheduleDate,
      },
    });

    if (schedulingExists) {
      throw new Error('Agendamento já existe');
    }

    const scheduling = await this.prisma.scheduling.create({
      data: {
        clientId: data.clientId,
        professionalId: data.professionalId,
        jobType: professionalExists.jobType,
        scheduleDate: data.scheduleDate,
      },
    });

    return scheduling;
  }

  async findAll() {
    return this.prisma.scheduling.findMany({
      include: {
        client: true,
        professional: true,
      }
    });
  }
}
