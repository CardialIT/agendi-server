import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ClientDTO } from 'src/modules/client/client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  async create(data: ClientDTO) {
    if (!data.userId) {
      throw new Error('Usuário não informado');
    }

    const userExists = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    if (userExists.role != 1) {
      throw new Error('Usuário não é um cliente');
    }

    const client = await this.prisma.client.create({
      data: {
        userId: data.userId,
      },
    });

    return client;
  }

  async findAll() {
      return this.prisma.client.findMany();
    }
  }