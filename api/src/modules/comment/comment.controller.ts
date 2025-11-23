import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("all")
  @HttpCode(200)
  async getAllComments() {
    const allComments = await this.commentService.getAllComments();

    return {
      comments: allComments
    }
  }

  @Get(":id")
  @HttpCode(200)
  async getAllCommentsByProduct(@Param("id") productId: string) {
    const allPostsByProduct = await this.commentService.getAllByProduct(productId);

    return {
      comments: allPostsByProduct,
    }
  }
}
