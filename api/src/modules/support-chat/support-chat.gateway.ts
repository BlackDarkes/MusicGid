import { WebSocketGateway } from '@nestjs/websockets';
import { SupportChatService } from './support-chat.service';

@WebSocketGateway()
export class SupportChatGateway {
  constructor(private readonly supportChatService: SupportChatService) {}
}
