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
import { OrderService } from "./order.service.js";
import { CreateOrderDto } from "./common/dto/order.dto.js";

@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get("")
	@HttpCode(200)
	async getAllOrders() {
		const orders = await this.orderService.getAllOrders();

		return {
			orders,
		};
	}

	@Get("user/:id")
	@HttpCode(200)
	async getAllUserOrders(@Param("id") userId: string) {
		const userOrders = await this.orderService.getUserOrders(userId);

		return {
			orders: userOrders,
		};
	}

	@Get(":id")
	@HttpCode(200)
	async getOrderById(@Param("id") orderId: string) {
		const order = await this.orderService.getOrderById(orderId);

		return {
			order,
		};
	}

	@Post("create")
	@HttpCode(201)
	async create(@Body() orderData: CreateOrderDto) {
		await this.orderService.create(orderData);

		return {
			message: "Заказ сделан!",
		};
	}

	@Patch(":id/status")
	@HttpCode(201)
	async updateStatus(@Param("id") orderId: string, @Body() statusId: number) {
		const updateOrderStatus = await this.orderService.updateOrderStatus(
			orderId,
			statusId,
		);

		return {
			order: updateOrderStatus,
		};
	}

	@Patch(":id/address")
	@HttpCode(201)
	async updateAddress(@Param("id") orderId: string, @Body() address: string) {
		const updateOrderAddress = await this.orderService.updateOrderAddress(
			orderId,
			address,
		);

		return {
			order: updateOrderAddress,
		};
	}

	@Delete(":id")
	@HttpCode(201)
	async delete(@Param("id") orderId: string) {
		await this.orderService.deleteOrder(orderId);

		return {
			message: "Заказ удален!",
		};
	}

	@Get("statuses/all")
	@HttpCode(200)
	async getStatuses() {
		const statuses = await this.orderService.getOrderStatuses();

		return {
			statuses,
		};
	}
}
