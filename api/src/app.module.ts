import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module.js";
import { PrismaModule } from "./modules/prisma/prisma.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CommentModule } from "./modules/comment/comment.module.js";
import { UserCartModule } from "./modules/user-cart/user-cart.module.js";
import { OrderModule } from "./modules/order/order.module.js";
import { OrderItemModule } from "./modules/order-item/order-item.module.js";
import { ProductModule } from "./modules/product/product.module.js";
import { RedisModule } from "./redis/redis.module.js";
import { SupportChatModule } from "./modules/support-chat/support-chat.module.js";
import { AdminModule } from "./modules/admin/admin.module.js";
import { CategoryModule } from "./modules/category/category.module.js";
import { BrandModule } from "./modules/brand/brand.module.js";
import { InstrumentTypeModule } from "./modules/instrument-type/instrument-type.module.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === "production" ? ".env.production" : ".env",
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public/uploads"),
			serveRoot: "/uploads",
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
		CategoryModule,
		BrandModule,
		InstrumentTypeModule,
	],
})
export class AppModule {}
