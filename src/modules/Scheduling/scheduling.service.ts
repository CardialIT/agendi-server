/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { SchedulingDTO } from './scheduling.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async create(data: SchedulingDTO) {
    if (!data.professionalId || !data.typeId || !data.clientId || !data.scheduleDate || !data.schedulingDate) {
      throw new Error('Dados do agendamento incompletos');
    }

    const schedulingExists = await this.prisma.scheduling.findFirst({
      where: {
        professionalId: data.professionalId,
        typeId: data.typeId,
        clientId: data.clientId,
        scheduleDate: data.scheduleDate,
        schedulingDate: data.schedulingDate
      },
    });

    if (schedulingExists) {
      throw new Error('Agendamento já existe');
    }

    const scheduling = await this.prisma.scheduling.create({
      data: {
        professionalId: data.professionalId,
        typeId: data.typeId,
        clientId: data.clientId,
        scheduleDate: data.scheduleDate,
        schedulingDate: data.schedulingDate
      },
    });

    return scheduling;
  }

  async findAll() {
    return this.prisma.scheduling.findMany({
      include: {
        client: true,
        professional: true,
        type: true
      }
    });
  }
}
