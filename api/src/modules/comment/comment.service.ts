import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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
            name: true
          }
        }
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
          }
        }
      },
      orderBy: {
        star: "desc"
      }
    })
  }
}
