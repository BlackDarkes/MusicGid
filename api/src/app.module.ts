import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module.js";
import { PrismaModule } from "./modules/prisma/prisma.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { ConfigModule } from "@nestjs/config";
import { CommentModule } from "./modules/comment/comment.module.js";
import { UserCartModule } from "./modules/user-cart/user-cart.module.js";
import { OrderModule } from "./modules/order/order.module.js";
import { OrderItemModule } from "./modules/order-item/order-item.module.js";
import { ProductModule } from "./modules/product/product.module.js";
import { RedisModule } from "./redis/redis.module.js";
import { SupportChatModule } from "./modules/support-chat/support-chat.module.js";
import { AdminModule } from './modules/admin/admin.module.js';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === "production" 
				? ".env.production" 
				: ".env",
			isGlobal: true,
		}),
		RedisModule,
		PrismaModule,
		UsersModule,
		AuthModule,
		CommentModule,
		UserCartModule,
		OrderModule,
		OrderItemModule,
		ProductModule,
		SupportChatModule,
		AdminModule,
	],
})
export class AppModule {}
