import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class InstrumentTypeService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllInstrumentTypes() {
		return this.prismaService.instrumentType.findMany();
	}

	async getInstrumentTypeById(instrumentTypeId: number) {
    if (!instrumentTypeId || typeof instrumentTypeId !== "number") {
      throw new BadRequestException("Некорректный id типа инструмента!");
    }

    const instrumentType = await this.getById(instrumentTypeId);

    if (!instrumentType) {
      throw new BadRequestException("Такой тип инструмента не существует!");
    }

		return instrumentType;
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

    if (!instrumentType ||  instrumentTypeId !== instrumentType.id) {
      throw new BadRequestException("Такой тип инструмента не существует!");
    }

		try {
      return this.prismaService.instrumentType.update({
        where: { id: instrumentTypeId },
        data: { type },
      });
    } catch {
      throw new BadRequestException("Такой тип инструмента не существует!");
    }
	}

	async delete(instrumentTypeId: number) {
    try {
      return this.prismaService.instrumentType.delete({
			  where: { id: instrumentTypeId },
		  });
    } catch {
      throw new BadRequestException("Такой тип инструмента не существует!");
    }
	}

  private async getById(id: number) {
    return this.prismaService.instrumentType.findUnique({ where: { id } });
  }
}
