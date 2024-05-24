/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { SchedulingDTO } from './scheduling.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async create(data: SchedulingDTO) {
    if (!data.clientId || !data.professionalId || !data.jobTypeId || !data.scheduleDate) {
      throw new Error('Dados do agendamento incompletos');
    }

    const schedulingExists = await this.prisma.scheduling.findFirst({
      where: {
        clientId: data.clientId,
        professionalId: data.professionalId,
        jobTypeId: data.jobTypeId,
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
        jobTypeId: data.jobTypeId,
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
        jobType: true
      }
    });
  }
}
