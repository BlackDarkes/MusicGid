import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { UsersModule } from "../users/users.module.js";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtConfig } from "../../config/jwt.config.js";
import { JwtStrategy } from "./common/strategy/jwt.strategy.js";
import { JwtGuard } from "./common/guard/jwt.guard.js";

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: JwtConfig,
			inject: [ConfigService],
		}),
		UsersModule,
		ConfigModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtGuard],
	exports: [AuthService, JwtStrategy, JwtGuard, JwtModule, ConfigModule]
})
export class AuthModule {}
