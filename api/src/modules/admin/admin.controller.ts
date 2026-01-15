/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";
import { AdminService } from "./admin.service.js";
import { Request, Response } from "express";
import { LoginDto } from "../auth/common/dto/login.dto.js";
import { AuthService } from "../auth/auth.service.js";
import { Auth } from "../auth/common/decorators/auth.decorator.js";
import { Roles } from "../auth/common/decorators/role.decorator.js";

@Controller("admin")
export class AdminController {
	constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

	@Post("login")
	@HttpCode(201)
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() loginData: LoginDto,
	) {
    const admin = await this.adminService.login(res, loginData);

    const { password: _, ...orderAdminData } = admin!;

    return {
      message: "Вы успешно авторизовались!",
      admin: orderAdminData,
    }
  }

  @Auth()
  @Roles("ADMIN")
  @Post("refresh")
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const admin = await this.authService.refresh(req, res);

    const { password, ...orderAdminData } = admin;

    return {
      message: "Токен обновлен!",
      admin: orderAdminData,
    } 
  }

  @Auth()
  @Roles("ADMIN")
  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);

    return {
      message: "Вы успешно вышли из аккаунта!"
    }
  }
}
