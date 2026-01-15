import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../guard/jwt.guard.js";
import { RolesGuard } from "../guard/roles.guard.js";

export const Auth = () => {
	return applyDecorators(UseGuards(JwtGuard, RolesGuard));
};
