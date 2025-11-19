import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { CommentModule } from "./modules/comment/comment.module";
import { UserCartModule } from "./modules/user-cart/user-cart.module";
import { OrderModule } from "./modules/order/order.module";
import { OrderItemModule } from './modules/order-item/order-item.module';
import { ProductModule } from './modules/product/product.module';
import { RedisModule } from './redis/redis.module';
import { SupportChatModule } from './modules/support-chat/support-chat.module';

@Module({
	imports: [
		ConfigModule.forRoot({
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
	],
})
export class AppModule {}
