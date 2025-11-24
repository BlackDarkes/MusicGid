import { IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";

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
  @Min(0)
  @Max(5)
  star: number;
}