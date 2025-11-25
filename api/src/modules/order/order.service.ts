import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./common/dto/order.dto";

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
	}
}
