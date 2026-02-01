import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service.js";
import { FilterDto } from "./common/dto/filter.dto.js";
import { CreateDto } from "./common/dto/create.dto.js";
import { CategoryType } from "./types/index.js";
import { diskStorage } from "multer";
import { Request } from "express";

@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post("")
	@HttpCode(200)
	async getAll(@Body() filters: FilterDto) {
		const products = await this.productService.getAllProducts(filters);

		return {
			...products,
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

	@Get("/category/:category")
	@HttpCode(200)
	async getByCategory(@Param("category") categoryName: CategoryType) {
		const products =
			await this.productService.getProductByCategory(categoryName);

		return {
			products,
		};
	}

	@Get("/brand/:brand")
	@HttpCode(200)
	async getByBrand(@Param("brand") brandName: string) {
		const products = await this.productService.getProductByBrand(brandName);

		return {
			products,
		};
	}

	@Post("/create")
	@UseInterceptors(
		FileInterceptor("image", {
			storage: diskStorage({
				destination: "./public/uploads/products",
				filename: (_: Request, file: Express.Multer.File, cb) => {
					const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
					cb(null, `${prefix}-${file.originalname}`);
				},
			}),
		}),
	)
	@HttpCode(201)
	async create(
		@Body() productData: CreateDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		await this.productService.create(productData, file.filename);

		return {
			message: "Продукт создан!",
		};
	}

	@Patch(":id")
	@HttpCode(201)
	async update(@Param("id") productId: string, @Body() updateData: CreateDto) {
		await this.productService.update(productId, updateData);

		return {
			productId,
			message: "Товар обновлен!",
		};
	}

	@Delete(":id")
	@HttpCode(200)
	async delete(@Param("id") productId: string) {
		await this.productService.delete(productId);

		return {
			productId,
			message: "Товар удален!",
		};
	}
}
