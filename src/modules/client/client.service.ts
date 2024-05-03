import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ClientDTO } from 'src/modules/client/client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  async create(data: ClientDTO) {
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Dados do cliente incompletos')
    }

    const clientExists = await this.prisma.client.findFirst({
      where: {
        name: data.name,
        email: data.email,
        phone: data.phone
      },
    });

    if (clientExists) {
      throw new Error('Cliente já existe')
    }

    const client = await this.prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone
      },
    });

    return client
  }

  async findAll() {
    return this.prisma.client.findMany();
  }
}