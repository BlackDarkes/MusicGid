import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateCategoryDto } from "./common/dto/createCategory.dto.js";

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllCategories() {
		return this.prismaService.category.findMany();
	}

	async getCategoryById(categoryId: number) {
		return this.prismaService.category.findUnique({
			where: { id: categoryId },
		});
	}

	async createCategory(data: CreateCategoryDto) {
		const { name, image } = data;

		return this.prismaService.category.create({ data: { name, image } });
	}

	async updateCategory(categoryId: number, data: CreateCategoryDto) {
		const { name, image } = data;

		return this.prismaService.category.update({
			where: { id: categoryId },
			data: { name, image },
		});
	}

	async deleteCategory(categoryId: number) {
		return this.prismaService.category.delete({ where: { id: categoryId } });
	}
}
