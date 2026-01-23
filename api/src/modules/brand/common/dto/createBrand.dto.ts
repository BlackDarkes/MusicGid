import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string
}