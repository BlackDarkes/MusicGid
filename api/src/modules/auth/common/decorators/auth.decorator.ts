import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../guard/jwt.guard";

export const Auth = () => {
	return applyDecorators(UseGuards(JwtGuard));
};
