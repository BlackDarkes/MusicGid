/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./common/dto/register.dto.js";
import { LoginDto } from "./common/dto/login.dto.js";
import { Request, Response } from "express";
import { Auth } from "./common/decorators/auth.decorator.js";
import { Authorize } from "./common/decorators/authorize.decorator.js";
import { User } from "@prisma/client";
import { Roles } from "./common/decorators/role.decorator.js";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@HttpCode(201)
	async register(@Body() registerData: RegisterDto) {
		await this.authService.register(registerData);

		return {
			message: "Вы успешно зарегистрировались!",
		};
	}

	@Post("login")
	@HttpCode(200)
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() loginData: LoginDto,
	) {
		const user = await this.authService.login(res, loginData);

		const { password, ...otherUserData } = user!;

		return {
			message: "Вы успешно вошли в аккаунт!",
			user: otherUserData,
		};
	}

	@Roles("USER")
	@Auth()
	@Post("logout")
	@HttpCode(200)
	async logout(@Res({ passthrough: true }) res: Response) {
		await this.authService.logout(res);

		return {
			message: "Вы успешно вышли из аккаунта!",
		};
	}

	@Roles("USER")
	@Auth()
	@Post("refresh")
	@HttpCode(200)
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = await this.authService.refresh(req, res);

		const { password, ...otherUserData } = user!;

		return {
			message: "Токен обновлен!",
			user: otherUserData,
		};
	}

	@Roles("USER")
	@Auth()
	@Get("@me")
	@HttpCode(200)
	async me(@Authorize() user: User) {
		const { password: _, ...otherUserData } = user!;

		return otherUserData;
	}
}
