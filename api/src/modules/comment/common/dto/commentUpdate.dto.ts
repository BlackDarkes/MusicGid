import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";

export class CommentUpdateDto {
  @IsString()
  @IsNotEmpty()
  commentId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  star: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}