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
import { OrderItemService } from "./order-item.service.js";
import { OrderItemDto } from "./common/orderItem.dto.js";

@Controller("order-item")
export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemService) {}

	@Get("")
	@HttpCode(200)
	async getAll() {
		const orderItems = await this.orderItemService.getAllOrderItem();

		return {
			orderItems,
		};
	}

	@Get("stat")
	@HttpCode(200)
	async getStats() {
		const stats = await this.orderItemService.getStats();

		return {
			stats,
		};
	}

	@Get("order/:orderId")
	@HttpCode(200)
	async getByOrderId(@Param("orderId") orderId: string) {
		const orderItems =
			await this.orderItemService.getOrderItemByOrderId(orderId);

		return {
			orderItems,
		};
	}

	@Get(":id")
	@HttpCode(200)
	async getByOrderItemId(@Param("id") orderItemId: string) {
		const orderItems =
			await this.orderItemService.getByOrderItemId(orderItemId);

		return {
			orderItems,
		};
	}

	@Post()
	@HttpCode(201)
	async create(@Body() createOrderItemData: OrderItemDto) {
		await this.orderItemService.create(createOrderItemData);

		return {
			message: "Товар добавлен в заказ!",
		};
	}

	@Patch(":id/quantity")
	@HttpCode(201)
	async updateQuantity(@Param() orderItemId: string, @Body() quantity: number) {
		await this.orderItemService.updateQuantity(orderItemId, quantity);

		return {
			message: "Количество товара обновлено!",
		};
	}

	@Delete(":id")
	@HttpCode(200)
	async delete(@Param("id") orderItemId: string) {
		await this.orderItemService.delete(orderItemId);

		return {
			message: "Товар удален из заказа!",
		};
	}
}
