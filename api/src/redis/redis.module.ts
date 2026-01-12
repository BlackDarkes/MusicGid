import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service.js";
import { Redis } from "ioredis"; 

@Global()
@Module({
	providers: [
		{
			provide: "REDIS_CLIENT",
			useFactory: async () => {
				const client = new Redis({
					host: "localhost",
					port: 6379,
					password: "",
					connectTimeout: 10000,
					commandTimeout: 5000,
					maxRetriesPerRequest: 3,
					lazyConnect: true,
					retryStrategy(times) {
						// Написать и вынести
					},
				});

				client.on("connect", () => {
					console.log("Redis good connection!");
				});

				client.on("error", (err) => {
					console.error("Redis error: ");
				});

				client.on("close", () => {
					console.log("Redis close connect!");
				});

				return client;
			},
		},
		RedisService,
	],
	exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}
