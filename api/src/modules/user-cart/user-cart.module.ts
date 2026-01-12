import { Module } from "@nestjs/common";
import { UserCartService } from "./user-cart.service.js";
import { UserCartController } from "./user-cart.controller.js";

@Module({
	controllers: [UserCartController],
	providers: [UserCartService],
})
export class UserCartModule {}
