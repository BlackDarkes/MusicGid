import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MinLength,
} from "class-validator";
import {  Type } from "class-transformer";
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

	@IsOptional()
	image: any;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	type: string;

	@IsNumber()
	@Type(() => Number)
	@IsNotEmpty()
	price: number;

	@IsNotEmpty()
	specifications: any;

	@IsInt()
	@Type(() => Number)
	@IsNotEmpty()
	count: number;

	@IsString()
	@IsNotEmpty()
	@MinLength(15)
	about: string;
}
