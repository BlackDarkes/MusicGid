import { CategoryEnum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsEnum(CategoryEnum)
  name: CategoryEnum;

  @IsString()
  @IsNotEmpty()
  image: string;
}