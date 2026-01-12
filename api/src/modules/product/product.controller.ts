import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { FilterDto } from "./common/dto/filter.dto.js";
import { CreateDto } from "./common/dto/create.dto.js";
import { CategoryType } from "./types/index.js";

@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get("")
	@HttpCode(200)
	async getAll(@Body() filters: FilterDto) {
		const products = await this.productService.getAllProducts(filters);

		return {
			products,
		};
	}

	@Get(":id")
	@HttpCode(200)
	async getById(@Param("id") productId: string) {
		const product = await this.productService.getProductById(productId);

		return {
			product,
		};
	}

	@Post("")
	@HttpCode(201)
	async create(@Body() productData: CreateDto) {
		await this.productService.create(productData);

		return {
			message: "Продукт создан!",
		};
	}

	@Patch(":id")
	@HttpCode(201)
	async update(@Param("id") productId: string, @Body() updateData) {
		await this.productService.update(productId, updateData);

		return {
			productId,
			message: "Товар обновлен!",
		};
	}

	/* Дописать работу с файлами! */
	// @Post("brand")
	// @HttpCode(201)
	// async createBrand(@Body() brandName: string) {
	// 	await this.productService.createBrand(brandName);

	// 	return {
	// 		message: `Бренд "${brandName}" создан!`,
	// 	}
	// }

	@Post("createType")
	@HttpCode(201)
	async createType(@Body() typeName: string) {
		await this.productService.createInstrumentType(typeName);

		return {
			message: `Тип "${typeName}" создан!`,
		};
	}

	@Get("/category")
	@HttpCode(200)
	async getByCategory(@Body() categoryName: CategoryType) {
		const products =
			await this.productService.getProductByCategory(categoryName);

		return {
			products,
		};
	}

	@Get("/brand")
	@HttpCode(200)
	async getByBrand(@Body() brandName: string) {
		const products = await this.productService.getProductByBrand(brandName);

		return {
			products,
		};
	}
}
