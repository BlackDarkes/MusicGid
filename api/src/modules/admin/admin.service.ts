import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { Response } from 'express';
import { LoginDto } from '../auth/common/dto/login.dto.js';
import { AuthService } from '../auth/auth.service.js';
import { compare } from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async login(res: Response, loginData: LoginDto) {
    const { email, password } = loginData;
    const admin = await this.userService.getUserByEmail(email);

    const isAdmin: boolean = admin?.role === "ADMIN";
    const isPasswordValid: boolean = admin ? await compare(password, admin.password) : false;

    if (!admin || !isAdmin || !isPasswordValid) {
      throw new UnauthorizedException("Админа с такими данными не существует!");
    }

    await this.authService.auth(res, admin.id, admin.email, admin.role);
    return admin;
  }
}
