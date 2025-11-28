import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { FilterDto } from "./common/dto/filter.dto";
import { CreateDto } from "./common/dto/create.dto";

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
}
