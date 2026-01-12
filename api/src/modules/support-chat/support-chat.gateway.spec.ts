import { Test, TestingModule } from "@nestjs/testing";
import { SupportChatGateway } from "./support-chat.gateway.js";
import { SupportChatService } from "./support-chat.service.js";

describe("SupportChatGateway", () => {
	let gateway: SupportChatGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SupportChatGateway, SupportChatService],
		}).compile();

		gateway = module.get<SupportChatGateway>(SupportChatGateway);
	});

	it("should be defined", () => {
		expect(gateway).toBeDefined();
	});
});
