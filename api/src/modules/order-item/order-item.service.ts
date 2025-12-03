import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { OrderItemDto } from "./common/orderItem.dto";

@Injectable()
export class OrderItemService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllOrderItem() {
		return await this.prismaService.orderItem.findMany({
			include: {
				order: {
					select: {
						id: true,
						orderNumber: true,
						orderDate: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
							},
						},
					},
				},
				product: {
					select: {
						id: true,
						name: true,
						image: true,
						price: true,
						brands: {
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

	async getOrderItemByOrderId(orderId: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
		});

		if (!order) {
			throw new NotFoundException("Заказ не найден!");
		}

		return this.prismaService.orderItem.findMany({
			where: {
				orderId,
			},
			include: {
				order: {
					select: {
						id: true,
						orderNumber: true,
						orderDate: true,
					},
				},
				product: {
					select: {
						id: true,
						name: true,
						image: true,
						price: true,
						brands: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});
	}

	async getByOrderItemId(orderItemId: string) {
		const orderItem = await this.prismaService.orderItem.findUnique({
			where: {
				id: orderItemId,
			},
			include: {
				order: {
					select: {
						id: true,
						orderNumber: true,
						orderDate: true,
						totalAmount: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								phone: true,
							},
						},
					},
				},
				product: {
					select: {
						id: true,
						name: true,
						image: true,
						price: true,
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
						count: true,
					},
				},
			},
		});

		if (!orderItem) {
			throw new NotFoundException("Товар из заказа не найден!");
		}

		return orderItem;
	}

	async create(dto: OrderItemDto) {
		const { orderId, productId, quantity } = dto;

		const order = await this.prismaService.order.findUnique({
			where: {
				id: orderId,
			},
			include: {
				orderStatus: true,
			},
		});

		if (!order) {
			throw new NotFoundException("Заказ не найден!");
		}

		if (order.orderStatus.status !== "В_сборке") {
			throw new BadRequestException(
				"Нельзя добавлять товары в заказ с текущим статусом!",
			);
		}

		const product = await this.prismaService.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) {
			throw new BadRequestException("Товар не найден!");
		}

		if (!product.isActive) {
			throw new BadRequestException("Товар не доступен для заказа!");
		}

		if (quantity < 1) {
			throw new BadRequestException(
				"Количество товаров должно быть минимум 1!",
			);
		}

		if (quantity > product.count) {
			throw new BadRequestException("Недостаточно товара на складе!");
		}

		const existingItem = await this.prismaService.orderItem.findFirst({
			where: {
				orderId,
				productId,
			},
		});

		if (existingItem) {
			throw new BadRequestException("Товар уже в заказе!");
		}

		const totalPrice = product.price * quantity;

		return await this.prismaService.$transaction(async (prisma) => {
			const orderItem = await this.prismaService.orderItem.create({
				data: {
					orderId,
					productId,
					productName: product.name,
					unitPrice: product.price,
					quantity,
					totalPrice,
				},
				include: {
					product: {
						include: {
							brands: true,
							categories: true,
						},
					},
				},
			});

			await prisma.order.update({
				where: {
					id: orderId,
				},
				data: {
					totalAmount: {
						increment: totalPrice,
					},
				},
			});

			await prisma.product.update({
				where: {
					id: productId,
				},
				data: {
					count: {
						decrement: quantity,
					},
				},
			});

			return orderItem;
		});
	}

	async updateQuantity(orderItemId: string, quantity: number) {
		if (quantity < 1) {
			throw new BadRequestException("Количество должно быть больше 1!");
		}

		const orderItem = await this.prismaService.orderItem.findUnique({
			where: {
				id: orderItemId,
			},
			include: {
				order: {
					include: {
						orderStatus: true,
					},
				},
				product: true,
			},
		});

		if (!orderItem) {
			throw new BadRequestException("Элемент заказа не найден!");
		}

		if (orderItem.order.orderStatus.status !== "В_сборке") {
			throw new BadRequestException(
				"Нельзя изменять заказ с текущим статусом!",
			);
		}

		// Доступное количество товаров
		const availableQuantity = orderItem.product.count + orderItem.quantity;

		if (quantity > availableQuantity) {
			throw new BadRequestException("Недостаточно товара на складе!");
		}

		const quantityDifference = quantity - orderItem.quantity;
		const priceDifference = orderItem.unitPrice * quantityDifference;

		return await this.prismaService.$transaction(async (prisma) => {
			const updateItem = await prisma.orderItem.update({
				where: {
					id: orderItemId,
				},
				data: {
					quantity,
					totalPrice: orderItem.unitPrice * quantity,
				},
				include: {
					product: {
						include: {
							brands: true,
							categories: true,
						},
					},
				},
			});

			await prisma.order.update({
				where: {
					id: orderItem.orderId,
				},
				data: {
					totalAmount: {
						increment: priceDifference,
					},
				},
			});

			await prisma.product.update({
				where: {
					id: orderItem.productId,
				},
				data: {
					count: {
						decrement: quantityDifference,
					},
				},
			});

			return updateItem;
		});
	}

	async delete(orderItemId: string) {
		const orderItem = await this.prismaService.orderItem.findUnique({
			where: {
				id: orderItemId,
			},
			include: {
				order: {
					include: {
						orderStatus: true,
					},
				},
			},
		});

		if (!orderItem) {
			throw new BadRequestException("Элемент заказа не найден!");
		}

		if (orderItem.order.orderStatus.status !== "В_сборке") {
			throw new BadRequestException(
				"Нельзя удалять товары из заказа с текущим статусом!",
			);
		}

		return await this.prismaService.$transaction(async (prisma) => {
			const deleteItem = await prisma.orderItem.delete({
				where: {
					id: orderItemId,
				},
			});

			await prisma.order.update({
				where: {
					id: deleteItem.orderId,
				},
				data: {
					totalAmount: {
						decrement: orderItem.totalPrice,
					},
				},
			});

			await prisma.product.update({
				where: {
					id: deleteItem.productId,
				},
				data: {
					count: {
						increment: orderItem.quantity,
					},
				},
			});

			return deleteItem;
		});
	}

	async getStats() {
		const stats = await this.prismaService.orderItem.groupBy({
			by: ["productId"],
			_sum: {
				quantity: true,
				totalPrice: true,
			},
			_count: {
				id: true,
			},
			orderBy: {
				_sum: {
					quantity: "desc",
				},
			},
		});

		const productIds = stats.map((stat) => stat.productId);
		const products = await this.prismaService.product.findMany({
			where: {
				id: {
					in: productIds,
				},
			},
			include: {
				brands: true,
			},
		});

		return stats.map((stat) => {
			const product = products.find((p) => p.id === stat.productId);
			return {
				productId: stat.productId,
				productName: product?.name || "Неизвестно",
				brand: product?.brands?.name,
				totalSold: stat._sum.quantity,
				totalRevenue: stat._sum.totalPrice,
				orderCount: stat._count.id,
			};
		});
	}
}
