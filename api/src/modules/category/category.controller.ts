import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CategoryService } from "./category.service.js";
import { CreateCategoryDto } from "./common/dto/createCategory.dto.js";

@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get("")
	@HttpCode(200)
	async getAllCategories() {
		return this.categoryService.getAllCategories();
	}

	@Get(":categoryId")
	@HttpCode(200)
	async getCategoryById(@Param("categoryId") categoryId: number) {
		return this.categoryService.getCategoryById(categoryId);
	}

	@Post("")
	@HttpCode(201)
	async createCategory(@Body() data: CreateCategoryDto) {
		await this.categoryService.createCategory(data);
    
    return {
      message: "Категория успешно создана",
    }
  }

	@Patch(":categoryId")
	@HttpCode(200)
	async updateCategory(
		@Param("categoryId") categoryId: number,
		@Body() data: CreateCategoryDto,
	) {
		await this.categoryService.updateCategory(categoryId, data);

    return {
      message: "Категория успешно обновлена",
    };
	}

	@Delete(":categoryId")
	@HttpCode(200)
	async deleteCategory(@Param("categoryId") categoryId: number) {
		await this.categoryService.deleteCategory(categoryId);

    return {
      message: "Категория успешно удалена",
    };
	}
}
