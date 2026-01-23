import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateBrandDto } from "./common/dto/createBrand.dto.js";

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllBrands() {
		return this.prismaService.brand.findMany();
	}

	async getBrandById(brandId: number) {
    if (!brandId || typeof brandId !== "number") {
      throw new BadRequestException("Некорректный id бренда!");
    }

    const brand = await this.getById(brandId);

    if (!brand) {
      throw new BadRequestException("Такого бренда не существует!");
    }

    return brand;
	}

  async getBrandByName(name: string) {
    return this.prismaService.brand.findFirst({ where: { name } });
  }

	async create(data: CreateBrandDto) {
		const { name, image } = data;

    const brand = await this.getBrandByName(name);

    if (brand) {
      throw new BadRequestException("Такой бренд уже существует!");
    }

		return this.prismaService.brand.create({ data: { name, image } });
	}

	async update(brandId: number, data: CreateBrandDto) {
		const { name, image } = data;

    const brand = await this.getBrandByName(name);

    if (brand && brand.id !== brandId) {
      throw new BadRequestException("Такой бренд уже существует!");
    }

    try {
      return await this.prismaService.brand.update({
        where: { id: brandId },
        data: { name, image },
      });
    } catch {
      throw new NotFoundException("Такого бренда не существует!");
    }
	}

	async delete(brandId: number) {
		try {
      return await this.prismaService.brand.delete({ where: { id: brandId } });
    } catch {
      throw new NotFoundException("Такого бренда не существует!");
    }
	}

  private async getById(id: number) {
    return this.prismaService.brand.findUnique({ where: { id } });
  }
}
