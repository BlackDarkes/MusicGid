import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "./common/dto/register.dto";
import { hash } from "bcrypt";
import { LoginDto } from "./common/dto/login.dto";

@Injectable()
export class AuthService {
	private readonly JWT_ACCESS_TOKEN_TTL: string;
	private readonly JWT_REFRESH_TOKEN_TTL: string;

	private readonly COOKIE_DOMAIN: string;

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
			"JWT_ACCESS_TOKEN_TTL",
		);
		this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
			"JWT_REFRESH_TOKEN_TTL",
		);
		this.COOKIE_DOMAIN = configService.get<string>("COOKIE_DOMAIN") ?? "";
	}

	async create(dto: RegisterDto) {
		const { name, email, password, phone } = dto;
		const user = await this.usersService.getUserByEmail(email);

		if (user) {
			throw new UnauthorizedException("Пользователь с такой почтой уже есть!");
		}

    await this.usersService.create({
      name,
      email,
      password: await hash(password, 10),
      phone
    })
	}

  async login(dto: LoginDto) {
    const { email, password } = dto;
  }

  async validate(id: string) {

  }
}
