import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { isDev } from "./utils/is-dev.utils.js";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.use(cookieParser());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			disableErrorMessages: isDev(configService),
		}),
	);

	app.enableCors({
		origin: [
			"http://localhost:3000",
			`http://${configService.getOrThrow<string>("HOST")}:${configService.getOrThrow<string>("PORT")}`,
		],
	});

	await app.listen(
		process.env.PORT ?? configService.getOrThrow<number>("PORT"),
	);
}
bootstrap();
