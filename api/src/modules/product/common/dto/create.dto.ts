import {
	IsDecimal,
	IsInt,
	IsNotEmpty,
	IsString,
	MinLength,
} from "class-validator";
import { CategoryType } from "../../types/index.js";

export class CreateDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	category: CategoryType;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	brand: string;

	@IsString()
	@IsNotEmpty()
	image: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	type: string;

	@IsDecimal()
	@IsNotEmpty()
	price: number;

	@IsNotEmpty()
	specifications: any;

	@IsInt()
	@IsNotEmpty()
	count: number;

	@IsString()
	@IsNotEmpty()
	@MinLength(15)
	about: string;
}
