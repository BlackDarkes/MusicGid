/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AdminService } from "./admin.service.js";
import { Response } from "express";
import { LoginDto } from "../auth/common/dto/login.dto.js";

@Controller("admin")
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

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
}
