import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CommentService } from "./comment.service.js";
import { CommentDto } from "./common/dto/comment.dto.js";
import { CommentUpdateDto } from "./common/dto/commentUpdate.dto.js";

@Controller("comment")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get("all")
	@HttpCode(200)
	async getAllComments() {
		const allComments = await this.commentService.getAllComments();

		return {
			comments: allComments,
		};
	}

	@Get(":id")
	@HttpCode(200)
	async getAllCommentsByProduct(@Param("id") productId: string) {
		const allPostsByProduct =
			await this.commentService.getAllByProduct(productId);

		return {
			comments: allPostsByProduct,
		};
	}

	@Post("")
	@HttpCode(201)
	async create(@Body() commentData: CommentDto) {
		const newComment = await this.commentService.create(commentData);

		return {
			message: "Новый комментарий создан!",
			comment: newComment,
		};
	}

	@Patch("")
	@HttpCode(201)
	async update(@Body() commentData: CommentUpdateDto) {
		const updateComment = await this.commentService.update(commentData);

		return {
			message: "Комент обновлен",
			comment: updateComment,
		};
	}

	@Delete(":id")
	@HttpCode(201)
	async delete(@Param("id") commentId: string, @Body() userId: string) {
		const deleteComment = await this.commentService.delete(commentId, userId);

		return {
			message: "Коментарий удален!",
			comment: deleteComment,
		};
	}
}
