import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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

	async getOrderItemByOrder(orderId: string) {
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

	async getOrderItemById(orderItemId: string) {
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

  
}
