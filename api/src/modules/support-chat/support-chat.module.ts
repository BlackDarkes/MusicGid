import { Module } from "@nestjs/common";
import { SupportChatService } from "./support-chat.service.js";
import { SupportChatGateway } from "./support-chat.gateway.js";

@Module({
	providers: [SupportChatGateway, SupportChatService],
})
export class SupportChatModule {}
