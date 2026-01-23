import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { InstrumentTypeService } from "./instrument-type.service.js";

@Controller("instrument-type")
export class InstrumentTypeController {
	constructor(private readonly instrumentTypeService: InstrumentTypeService) {}

  @Get("")
  @HttpCode(200)
  async getAllInstrumentTypes() {
    return this.instrumentTypeService.getAllInstrumentTypes();
  }

  @Get(":id")
  @HttpCode(200)
  async getInstrumentTypeById(@Param("id") instrumentTypeId: number) {
    return this.instrumentTypeService.getInstrumentTypeById(instrumentTypeId);
  }

  @Post("")
  @HttpCode(201)
  async createInstrumentType(@Body() type: string) {
    await this.instrumentTypeService.create(type);

    return { message: "Тип инструмента создан!" };
  }

  @Patch(":id")
  @HttpCode(200)
  async updateInstrumentType(@Param("id") instrumentTypeId: number, @Body() type: string) {
    await this.instrumentTypeService.update(instrumentTypeId, type);

    return { message: "Тип инструмента обновлен!" };
  }

  @Delete(":id")
  @HttpCode(200)
  async deleteInstrumentType(@Param("id") instrumentTypeId: number) {
    await this.instrumentTypeService.delete(instrumentTypeId);

    return { message: "Тип инструмента удален!" };
  }
}
