import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  comment: string;

  @IsInt()
  @IsNotEmpty()
  star: number;
}