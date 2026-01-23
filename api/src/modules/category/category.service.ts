import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateCategoryDto } from "./common/dto/createCategory.dto.js";
import { CategoryEnum } from "@prisma/client";

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

  async getCategoryByName(name: CategoryEnum) {
    return this.prismaService.category.findFirst({
      where: { name },
    });
  }

	async createCategory(data: CreateCategoryDto) {
		const { name, image } = data;

    const category = await this.getCategoryByName(name);

    if (category) {
      throw new BadRequestException("Такая категория уже существует!");
    }

		return this.prismaService.category.create({ data: { name, image } });
	}

	async updateCategory(categoryId: number, data: CreateCategoryDto) {
		const { name, image } = data;

    const category = await this.getCategoryByName(name);

    if (category && category.id !== categoryId) {
      throw new BadRequestException("Такая категория уже существует!");
    }

		return this.prismaService.category.update({
			where: { id: categoryId },
			data: { name, image },
		});
	}

	async deleteCategory(categoryId: number) {
    const brand = await this.getCategoryById(categoryId);

    if (!brand) {
      throw new BadRequestException("Такая категория не существует!");
    }

		return this.prismaService.category.delete({ where: { id: categoryId } });
	}
}
