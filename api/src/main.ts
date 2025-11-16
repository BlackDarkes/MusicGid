import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(CookieParser());

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ["http://localhost:3000", `http://${configService.getOrThrow<string>("HOST")}:${configService.getOrThrow<string>("PORT")}`]
  })

  await app.listen(process.env.PORT ?? configService.getOrThrow<number>("PORT"));
}
bootstrap();
