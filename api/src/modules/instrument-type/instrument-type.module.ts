import { Module } from "@nestjs/common";
import { InstrumentTypeService } from "./instrument-type.service.js";
import { InstrumentTypeController } from "./instrument-type.controller.js";

@Module({
	controllers: [InstrumentTypeController],
	providers: [InstrumentTypeService],
})
export class InstrumentTypeModule {}
