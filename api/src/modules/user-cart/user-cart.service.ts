import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserCartDto } from "./common/dto/userCart.dto";
import { IIssues } from "./types/issues.interface";

@Injectable()
export class UserCartService {
	constructor(private readonly prismaService: PrismaService) {}

	async getUserCart(userId: string) {
		const user = await this.prismaService.user.findMany({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден!");
		}

		return await this.prismaService.userCart.findMany({
			where: {
				userId,
			},
			include: {
				product: {
					include: {
						brands: {
							select: {
								id: true,
								name: true,
							},
						},
						categories: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async addToCart(dto: UserCartDto) {
		const { userId, productId, count } = dto;

		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден!");
		}

		const product = await this.prismaService.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) {
			throw new NotFoundException("Товар не найден!");
		}

		if (!product.isActive) {
			throw new BadRequestException("Товара недоступен!");
		}

		if (product.count < 1) {
			throw new BadRequestException("Товара нет в наличии!");
		}

		if (product.count < count) {
			throw new BadRequestException(
				`Недостаточно товара! Доступно: ${product.count}`,
			);
		}

		const exitingCartItem = await this.prismaService.userCart.findFirst({
			where: {
				userId,
				productId,
			},
		});

		if (exitingCartItem) {
			const newCount = exitingCartItem.count + count;

			if (product.count < newCount) {
				throw new BadRequestException(
					`Недостаточно товара! Доступно: ${product.count}`,
				);
			}

			return await this.prismaService.userCart.update({
				where: {
					id: exitingCartItem.id,
				},
				data: {
					count: newCount,
				},
				include: {
					product: {
						include: {
							brands: {
								select: {
									id: true,
									name: true,
								},
							},
							categories: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
		}

		return await this.prismaService.userCart.create({
			data: dto,
			include: {
				product: {
					include: {
						brands: {
							select: {
								id: true,
								name: true,
							},
						},
						categories: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
	}

	async updateCartItem(cartItemId: string, count: number) {
		if (count < 1) {
			throw new BadRequestException(
				"Количество товаров должно, быть минимум 1",
			);
		}

		const cartItem = await this.prismaService.userCart.findUnique({
			where: {
				id: cartItemId,
			},
			include: {
				product: true,
			},
		});

		if (!cartItem) {
			throw new BadRequestException("Товар в корзине не найден!");
		}

		if (cartItem.product.count < count) {
			throw new BadRequestException(
				`Недостаточно товара ${cartItem.product.name}! Доступно: ${cartItem.product.count}`,
			);
		}

		return await this.prismaService.userCart.update({
			where: {
				id: cartItemId,
			},
			data: { count },
			include: {
				product: {
					include: {
						brands: {
							select: {
								id: true,
								name: true,
							},
						},
						categories: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});
	}

	async removeFromCart(cartItemId: string) {
		const cartItem = await this.prismaService.userCart.findUnique({
			where: {
				id: cartItemId,
			},
		});

		if (!cartItem) {
			throw new NotFoundException("Товар не найден в корзине!");
		}

		return await this.prismaService.userCart.delete({
			where: {
				id: cartItemId,
			},
		});
	}

	async clearUserCart(userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден!");
		}

		return await this.prismaService.userCart.deleteMany({
			where: { userId },
		});
	}

	async getCartTotal(userId: string) {
		const cartItems = await this.prismaService.userCart.findMany({
			where: { userId },
			include: {
				product: {
					select: {
						price: true,
					},
				},
			},
		});

		const total = cartItems.reduce((sum, item) => {
			return (sum += sum + item.product.price);
		}, 0);

		const itemsCount = cartItems.reduce((sum, item) => {
			return (sum += sum + item.count);
		}, 0);

		return {
			total,
			itemsCount,
			cartItemsCount: cartItems.length,
		};
	}

	async validateCart(userId: string) {
		const cartItems = await this.prismaService.userCart.findMany({
			where: { userId },
			include: {
				product: true,
			},
		});

		const issues: IIssues[] = [];

		for (const cartItem of cartItems) {
			if (!cartItem.product.isActive) {
				issues.push({
					productId: cartItem.productId,
					productName: cartItem.product.name,
					issue: "Товар недоступен!",
				});
			} else if (cartItem.product.count < cartItem.count) {
				issues.push({
					productId: cartItem.productId,
					productName: cartItem.product.name,
					issue: `Недостаточно товара ${cartItem.product.name}! Доступно: ${cartItem.product.count}`,
				});
			}
		}

		return {
			isValid: issues.length === 0,
			issues,
			cartItemsCount: cartItems.length,
		};
	}
}
