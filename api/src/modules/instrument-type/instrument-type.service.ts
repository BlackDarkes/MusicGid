import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class InstrumentTypeService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getAllInstrumentTypes() {
    return this.prismaService.instrumentType.findMany();
  }

  async getInstrumentTypeById(instrumentTypeId: number) {
    return this.prismaService.instrumentType.findUnique({ where: { id: instrumentTypeId } });
  }

  async create(type: string) {
    return this.prismaService.instrumentType.create({ data: { type } });
  }

  async update(instrumentTypeId: number, type: string) {
    return this.prismaService.instrumentType.update({ where: { id: instrumentTypeId }, data: { type } });
  }

  async delete(instrumentTypeId: number) {
    return this.prismaService.instrumentType.delete({ where: { id: instrumentTypeId } });
  }
}
