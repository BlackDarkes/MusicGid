import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentTypeService } from './instrument-type.service';

describe('InstrumentTypeService', () => {
  let service: InstrumentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentTypeService],
    }).compile();

    service = module.get<InstrumentTypeService>(InstrumentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
