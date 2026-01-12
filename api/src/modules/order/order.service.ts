import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateOrderDto } from "./common/dto/order.dto.js";

@Injectable()
export class OrderService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllOrders() {
		return await this.prismaService.order.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
					},
				},
				orderStatus: true,
				paymentMethodsRel: true,
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								image: true,
								price: true,
							},
						},
					},
				},
			},
			orderBy: {
				orderDate: "desc",
			},
		});
	}

	async getUserOrders(userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден!");
		}

		return await this.prismaService.order.findMany({
			where: {
				userId,
			},
			include: {
				orderStatus: true,
				paymentMethodsRel: true,
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								image: true,
								price: true,
							},
						},
					},
				},
			},
			orderBy: {
				orderDate: "desc",
			},
		});
	}

	async getOrderById(orderId: string) {
		const order = await this.prismaService.order.findUnique({
			where: {
				id: orderId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
						address: true,
					},
				},
				orderStatus: true,
				paymentMethodsRel: true,
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								image: true,
								price: true,
								brands: true,
								categories: true,
							},
						},
					},
				},
			},
		});

		if (!order) {
			throw new NotFoundException("Заказ не найден!");
		}

		return order;
	}

	async create(dto: CreateOrderDto) {
		const user = await this.prismaService.user.findUnique({
			where: { id: dto.userId },
		});

		if (!user) {
			throw new BadRequestException("Пользователь не найден!");
		}

		const paymentMethod = await this.prismaService.paymentMethod.findUnique({
			where: { id: dto.paymentMethod },
		});

		if (!paymentMethod) {
			throw new BadRequestException("Метод оплаты не найден!");
		}

		for (const item of dto.orderItems) {
			const product = await this.prismaService.product.findUnique({
				where: { id: item.productId },
			});

			if (!product) {
				throw new NotFoundException(
					`Product with id ${item.productId} not found`,
				);
			}

			if (product.count < item.quantity) {
				throw new BadRequestException(
					`Not enough stock for product ${product.name}. Available: ${product.count}, requested: ${item.quantity}`,
				);
			}
		}

		const lastOrder = await this.prismaService.order.findFirst({
			orderBy: {
				orderNumber: "desc",
			},
		});

		const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

		return await this.prismaService.$transaction(async (prisma) => {
			const order = await prisma.order.create({
				data: {
					userId: dto.userId,
					orderNumber: nextOrderNumber,
					orderDate: new Date(),
					paymentMethod: dto.paymentMethod,
					statusId: 1,
					address: dto.address,
					totalAmount: dto.orderItems.reduce(
						(sum, item) => sum + item.totalPrice,
						0,
					),
				},
			});

			await prisma.orderItem.createMany({
				data: dto.orderItems.map((item) => ({
					orderId: order.id,
					productId: item.productId,
					productName: item.productName,
					unitPrice: item.unitPrice,
					quantity: item.quantity,
					totalPrice: item.totalPrice,
				})),
			});

			for (const item of dto.orderItems) {
				await prisma.product.update({
					where: { id: item.productId },
					data: {
						count: {
							decrement: item.quantity,
						},
					},
				});
			}

			return await prisma.order.findUnique({
				where: { id: order.id },
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					orderStatus: true,
					paymentMethodsRel: true,
					orderItems: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true,
								},
							},
						},
					},
				},
			});
		});
	}

	async updateOrderStatus(orderId: string, statusId: number) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
		});

		if (!order) {
			throw new NotFoundException("Order not found");
		}

		const status = await this.prismaService.orderStatus.findUnique({
			where: { id: statusId },
		});

		if (!status) {
			throw new NotFoundException("Order status not found");
		}

		return await this.prismaService.order.update({
			where: { id: orderId },
			data: {
				statusId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				orderStatus: true,
				paymentMethodsRel: true,
				orderItems: {
					include: {
						product: {
							select: {
								id: true,
								name: true,
								image: true,
							},
						},
					},
				},
			},
		});
	}

	async updateOrderAddress(orderId: string, address: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
		});

		if (!order) {
			throw new NotFoundException("Order not found");
		}

		if (order.statusId !== 1) {
			throw new BadRequestException(
				"Cannot change address for orders in current status",
			);
		}

		return await this.prismaService.order.update({
			where: { id: orderId },
			data: {
				address,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				orderStatus: true,
				paymentMethodsRel: true,
				orderItems: true,
			},
		});
	}

	async deleteOrder(orderId: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
			include: {
				orderItems: true,
			},
		});

		if (!order) {
			throw new NotFoundException("Order not found");
		}

		return await this.prismaService.$transaction(async (prisma) => {
			for (const item of order.orderItems) {
				await prisma.product.update({
					where: { id: item.productId },
					data: {
						count: {
							increment: item.quantity,
						},
					},
				});
			}

			return await prisma.order.delete({
				where: { id: orderId },
			});
		});
	}

	async getOrderStatuses() {
		return await this.prismaService.orderStatus.findMany();
	}

	async getPaymentMethods() {
		return await this.prismaService.paymentMethod.findMany();
	}
}
