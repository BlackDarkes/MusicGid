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
import { BrandService } from "./brand.service.js";
import { CreateBrandDto } from "./common/dto/createBrand.dto.js";

@Controller("brand")
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@Get("")
	@HttpCode(200)
	async getAllBrands() {
		return this.brandService.getAllBrands();
	}

	@Get(":id")
	@HttpCode(200)
	async getBrandById(@Param("id") brandId: number) {
		return this.brandService.getBrandById(brandId);
	}

	@Post("")
	@HttpCode(201)
	async createBrand(@Body() data: CreateBrandDto) {
		await this.brandService.create(data);

		return {
			message: "Бренд успешно создан",
		};
	}

	@Patch(":id")
	@HttpCode(200)
	async updateBrand(
		@Param("id") brandId: number,
		@Body() data: CreateBrandDto,
	) {
		await this.brandService.update(brandId, data);

		return {
			message: "Бренд успешно обновлен",
		};
	}

	@Delete(":id")
	@HttpCode(200)
	async delete(@Param("id") brandId: number) {
		await this.brandService.delete(brandId);

		return {
			message: "Бренд успешно удален",
		};
	}
}
