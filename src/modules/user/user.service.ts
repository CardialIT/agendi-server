import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO, UserLoginDTO } from 'src/modules/user/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: UserDTO) {
        if (!data.name || !data.email || !data.phone || !data.legalId || !data.role) {
            throw new Error('Dados do usuário incompletos')
        }

        const userExists = await this.prisma.user.findFirst({
            where: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                legalId: data.legalId,
                role: data.role
            },
        });

        if (userExists) {
            throw new Error('Usuário já existe')
        }

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                legalId: data.legalId,
                role: data.role
            },
        });

        return user
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findByEmail(data: UserLoginDTO) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        return this.findUserRoleId(user);
    }

    async findUserRoleId(data: UserDTO) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
            include: {
                client: true,
                professional: true
            }
        });

        if (user.client !== null) {
            return user.client.id
        } else {
            return user.professional.id
        }
    }
}