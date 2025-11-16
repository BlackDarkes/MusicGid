import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async create(user: Prisma.UserCreateInput): Promise<User | null> {
    const newUser = await this.prisma.user.create({ data: user });

    return newUser;
  }
}
