import { Module } from '@nestjs/common';
import { SupportChatService } from './support-chat.service';
import { SupportChatGateway } from './support-chat.gateway';

@Module({
  providers: [SupportChatGateway, SupportChatService],
})
export class SupportChatModule {}
