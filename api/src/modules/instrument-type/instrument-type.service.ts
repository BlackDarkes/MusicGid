import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class InstrumentTypeService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllInstrumentTypes() {
		return this.prismaService.instrumentType.findMany();
	}

	async getInstrumentTypeById(instrumentTypeId: number) {
		return this.prismaService.instrumentType.findUnique({
			where: { id: instrumentTypeId },
		});
	}

	async getInstrumentTypeByName(type: string) {
		return this.prismaService.instrumentType.findFirst({ where: { type } });
	}

	async create(type: string) {
    const instrumentType = await this.getInstrumentTypeByName(type);

    if (instrumentType) {
      throw new BadRequestException("Такой тип инструмента уже существует!");
    }

		return this.prismaService.instrumentType.create({ data: { type } });
	}

	async update(instrumentTypeId: number, type: string) {
    const instrumentType = await this.getInstrumentTypeByName(type);

    if (instrumentType && instrumentType.id !== instrumentTypeId) {
      throw new BadRequestException("Такой тип инструмента уже существует!");
    }

		return this.prismaService.instrumentType.update({
			where: { id: instrumentTypeId },
			data: { type },
		});
	}

	async delete(instrumentTypeId: number) {
    const instrumentType = await this.getInstrumentTypeById(instrumentTypeId);

    if (!instrumentType) {
      throw new BadRequestException("Такой тип инструмента не существует!");
    }

		return this.prismaService.instrumentType.delete({
			where: { id: instrumentTypeId },
		});
	}
}
