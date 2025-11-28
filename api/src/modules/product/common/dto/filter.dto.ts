import { IsBoolean, IsEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class FilterDto {
  @IsEmpty()
  @IsNumber()
  categoryId?: number;

  @IsEmpty()
  @IsNumber()
  brandId?: number;

  @IsEmpty()
  @IsNumber()
  typeId?: number;

  @IsEmpty()
  @IsNumber()
  maxPrice?: number;

  @IsEmpty()
  @IsNumber()
  minPrice?: number;

  @IsEmpty()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsEmpty()
  @IsBoolean()
  isActive?: boolean;

  @IsEmpty()
  @IsNumber()
  page?: number;

  @IsEmpty()
  @IsNumber()
  limit?: number;
}