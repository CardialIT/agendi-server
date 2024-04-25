/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { SchedulingDTO } from './scheduling.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async create(data: SchedulingDTO) {
    const schedulingExists = await this.prisma.scheduling.findFirst({
      where: {
        profissional: data.profissional,
        type: data.type,
        client: data.client,
        date: data.date,
        hour: data.hour,
      },
    });

    if (schedulingExists) {
      throw new Error('Agendamento já existe!');
    }

    if (
      !data.profissional ||
      !data.type ||
      !data.client ||
      !data.date ||
      !data.hour
    ) {
      throw new Error('Dados de agendamento incompletos!');
    }

    const scheduling = await this.prisma.scheduling.create({
      data: {
        profissional: data.profissional,
        type: data.type,
        client: data.client,
        date: data.date,
        hour: data.hour,
      },
    });

    return scheduling;
  }

  async findAll() {
    return this.prisma.scheduling.findMany();
  }
}
