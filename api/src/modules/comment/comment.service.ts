import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommentDto } from "./common/dto/comment.dto";
import { CommentUpdateDto } from "./common/dto/commentUpdate.dto";

@Injectable()
export class CommentService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllComments() {
		return await this.prismaService.comment.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	async getAllByProduct(productId: string) {
		return await this.prismaService.comment.findMany({
			where: {
				productId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: {
				star: "desc",
			},
		});
	}

	async getAllByUsersComments(userId: string) {
		return await this.prismaService.comment.findMany({
			where: {
				userId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	async create(dto: CommentDto) {
		const { userId, productId, comment, star } = dto;
		const trimComment: string = comment.trim();

		if (star < 0 || star > 5) {
			throw new BadRequestException(
				"Рейтинг не может быть меньше 0 или больше 5",
			);
		}

		if (trimComment.length < 15) {
			throw new BadRequestException(
				"Длина комментария должна быть минимум 15 символов!",
			);
		}

		const [user, product] = await Promise.all([
			this.prismaService.user.findUnique({
				where: { id: userId },
			}),
			this.prismaService.product.findMany({
				where: { id: productId },
			}),
		]);

		if (!user) {
			throw new NotFoundException("Пользователь не найден!");
		}

		if (!product) {
			throw new NotFoundException("Товар не найден!");
		}

		return await this.prismaService.comment.create({
			data: {
				userId,
				productId,
				comment: trimComment,
				star,
			},
		});
	}

	async update(dto: CommentUpdateDto) {
		const { commentId, userId, comment, star } = dto;

		const findComment = await this.prismaService.comment.findUnique({
			where: { id: commentId },
		});

		if (!findComment) {
			throw new NotFoundException("Такого комментария не существует!");
		}

		if (findComment.userId !== userId) {
			throw new NotFoundException("Вы не можете изменить данный комментарий!");
		}

		if (star < 0 || star > 5) {
			throw new Error("Рейтинг не может быть меньше 0 или больше!");
		}

		return await this.prismaService.comment.update({
			where: { id: commentId },
			data: {
				comment,
				star,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatar: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	async delete(commentId: string, userId: string) {
		const findComment = await this.prismaService.comment.findUnique({
			where: { id: commentId },
		});

		if (!findComment) {
			throw new NotFoundException("Пост не найден!");
		}

		if (findComment.userId === userId) {
			throw new NotFoundException("Вы не можете удалить данный комментарий!");
		}

		return await this.prismaService.comment.delete({
			where: { id: commentId },
		});
	}
}
