import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentTypeController } from './instrument-type.controller';
import { InstrumentTypeService } from './instrument-type.service';

describe('InstrumentTypeController', () => {
  let controller: InstrumentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentTypeController],
      providers: [InstrumentTypeService],
    }).compile();

    controller = module.get<InstrumentTypeController>(InstrumentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
