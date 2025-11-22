import { IsDecimal, IsInt, IsJSON, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ISpecifications } from "../../types/specifications.interface";

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  category: string;

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

  @IsDecimal()
  @IsNotEmpty()
  star: number;

  @IsJSON()
  @IsNotEmpty()
  specifications: ISpecifications[];

  @IsInt()
  @IsNotEmpty()
  count: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  about: string;
}