import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateBrandDto } from "./common/dto/createBrand.dto.js";

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllBrands() {
		return this.prismaService.brand.findMany();
	}

	async getBrandById(brandId: number) {
		return this.prismaService.brand.findUnique({ where: { id: brandId } });
	}

	async create(data: CreateBrandDto) {
		const { name, image } = data;

		return this.prismaService.brand.create({ data: { name, image } });
	}

	async update(brandId: number, data: CreateBrandDto) {
		const { name, image } = data;

		return this.prismaService.brand.update({
			where: { id: brandId },
			data: { name, image },
		});
	}

	async delete(brandId: number) {
		return this.prismaService.brand.delete({ where: { id: brandId } });
	}
}
