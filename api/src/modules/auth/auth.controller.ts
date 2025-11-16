import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './common/dto/register.dto';
import { LoginDto } from './common/dto/login.dto';
import { Request, Response } from 'express';
import { Auth } from './common/decorators/auth.decorator';
import { Authorize } from './common/decorators/authorize.decorator';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post("register")
  @HttpCode(201)
  async register(@Body() registerData: RegisterDto) {
    await this.authService.register(registerData);
    
    return {
      message: "Вы успешно зарегистрировались!",
    }
  }

  @Post("login")
  @HttpCode(200)
  async login(@Res({ passthrough: true }) res: Response, @Body() loginData: LoginDto) {
    const accessToken = await this.authService.login(res, loginData);
    const user = await this.userService.getUserByEmail(loginData.email);

    return {
      message: "Вы успешно вошли в аккаунт!",
      token: accessToken,
      user
    }
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout(res);

    return {
      message: "Вы успешно вышли из аккаунта!",
    }
  }

  @Auth()
  @Post("refresh")
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = await this.authService.refresh(req, res);

    return {
      token: refreshToken,
    }
  }

  @Auth()
  @Get("@me")
  @HttpCode(200)
  async me(@Authorize() user) {
    return user;
  }
}
