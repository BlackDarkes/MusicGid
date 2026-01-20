import { IsBoolean, IsOptional, IsNumber, IsString, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class FilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  brandId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  typeId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
