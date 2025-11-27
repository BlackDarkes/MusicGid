import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  count: number;
}