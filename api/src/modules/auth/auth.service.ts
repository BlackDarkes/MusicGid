import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service.js";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "./common/dto/register.dto.js";
import { hash, compare } from "bcrypt";
import { LoginDto } from "./common/dto/login.dto.js";
import { Request, Response } from "express";
import { isDev } from "../../utils/is-dev.utils.js";
import { IPayload } from "../../modules/auth/types/payload.interface.js";

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

	async register(dto: RegisterDto) {
		const { name, email, password, phone } = dto;
		const user = await this.usersService.getUserByEmail(email);

		if (user) {
			throw new UnauthorizedException("Пользователь с такой почтой уже есть!");
		}

		await this.usersService.create({
			name,
			email,
			password: await hash(password, 10),
			phone,
		});
	}

	async login(res: Response, dto: LoginDto) {
		const { email, password } = dto;
		const user = await this.usersService.getUserByEmail(email);

		if (!user || !(await compare(password, user.password))) {
			throw new UnauthorizedException("Таких данных нет в базе данных!");
		}

		await this.auth(res, user.id, email);
		return user;
	}

	async logout(res: Response) {
		return this.clearTokens(res);
	}

	async validate(id: string) {
		const user = await this.usersService.getUserById(id);

		if (!user) {
			throw new UnauthorizedException("Пользователь не найден!");
		}

		return user;
	}

	async refresh(req: Request, res: Response) {
		const refreshToken = req?.cookies?.["refresh_token"];

		if (!refreshToken) {
			throw new UnauthorizedException("Недействительный токен!");
		}

		try {
			const payload: IPayload = await this.jwtService.verifyAsync(refreshToken);
			const user = await this.usersService.getUserById(payload.id);

			if (!user) {
				throw new NotFoundException("Пользователь не найден!");
			}

			await this.auth(res, user.id, user.email);
			return user;
		} catch {
			this.clearTokens(res);
			throw new UnauthorizedException("Неверный refresh token!");
		}
	}

	private createTokens = (id: string, email: string) => {
		const payload: IPayload = { id, email };

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL,
		} as any);

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL,
		} as any);

		return {
			accessToken,
			refreshToken,
		};
	};

	private setCookie(res: Response, name: string, value: string, expires: Date) {
		res.cookie(name, value, {
			httpOnly: true,
			secure: !isDev(this.configService),
			expires,
			domain: "",
			sameSite: !isDev(this.configService) ? "strict" : "lax",
		});
	}

	private clearTokens(res: Response) {
		const clearOption = {
			httpOnly: true,
			secure: !isDev(this.configService),
			domain: "",
		};

		res.cookie("access_token", "", { ...clearOption, expires: new Date(0) });
		res.cookie("refresh_token", "", { ...clearOption, expires: new Date(0) });
	}

	private async auth(res: Response, id: string, email: string) {
		const { accessToken, refreshToken } = this.createTokens(id, email);

		const accessTokenExpires = new Date(Date.now() + 1000 * 60 * 60);
		const refreshTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 31);

		this.setCookie(res, "access_token", accessToken, accessTokenExpires);
		this.setCookie(res, "refresh_token", refreshToken, refreshTokenExpires);
	}
}
