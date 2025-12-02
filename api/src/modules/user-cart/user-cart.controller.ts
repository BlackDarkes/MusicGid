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
import { UserCartService } from "./user-cart.service";
import { UserCartDto } from "./common/dto/userCart.dto";

@Controller("user-cart")
export class UserCartController {
	constructor(private readonly userCartService: UserCartService) {}

	@Get(":userId")
	@HttpCode(200)
	async getUserCart(@Param("userId") userId: string) {
		const userCarts = await this.userCartService.getUserCart(userId);

		return {
			carts: userCarts,
		};
	}

	@Post("")
	@HttpCode(200)
	async create(@Body() cartData: UserCartDto) {
		const product = await this.userCartService.addToCart(cartData);

		return {
			message: `${product.product.name} добавлен в корзину!`,
		};
	}

	@Patch(":cartId")
	@HttpCode(201)
	async update(@Param("cartId") cartId: string, @Body() count: number) {
		const product = await this.userCartService.updateCartItem(cartId, count);

		return {
			message: "Количество изменилось!",
		};
	}

	@Delete(":cartId")
	@HttpCode(201)
	async delete(@Param("cartId") cartId: string) {
		await this.userCartService.removeFromCart(cartId);

		return {
			message: "Товар удален из корзины!",
		};
	}

	@Delete(":userId/all")
	@HttpCode(201)
	async deleteAll(@Param("userId") userId: string) {
		await this.userCartService.clearUserCart(userId);

		return {
			message: "Корзина полностью очищена!",
		};
	}

	@Get(":userId/total")
	@HttpCode(200)
	async getTotal(@Param("userId") userId: string) {
		const total = await this.userCartService.getCartTotal(userId);

		return {
			total,
		};
	}

	@Get(":userId/check")
	@HttpCode(200)
	async checkCart(@Param("userId") userId: string) {
		const cart = await this.userCartService.validateCart(userId);

		return {
			cart,
		};
	}
}
