import { Request } from "express"; // Импортируй Request
import { IPayload } from "../../types/payload.interface.js";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../../auth.service.js";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.["access_token"]; 
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>("SECRET"),
			algorithms: ["HS256"],
		});
	}

	async validate(payload: IPayload) {
		return await this.authService.validate(payload.id);
	}
}