import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "generated/prisma/client";

export const Authorize = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		const user = request.user;

		return data ? user![user] : user;
	},
);
