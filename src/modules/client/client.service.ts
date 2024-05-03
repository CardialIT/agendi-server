import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ClientDTO } from 'src/modules/client/client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  async create(data: ClientDTO) {
    const clientExists = await this.prisma.client.findFirst({
      where: {
        name: data.nameClient,
        email: data.emailClient,
        phone: data.clientPhone
      },
    });

    if (clientExists) {
      throw new Error('Cliente já existe')
    }

    if (!data.nameClient || !data.emailClient || !data.clientPhone) {
      throw new Error('Dados do cliente incompletos')
    }

    const client = await this.prisma.client.create({
      data: {
        name: data.nameClient,
        email: data.emailClient,
        phone: data.clientPhone
      },
    });

    return client
  }
}