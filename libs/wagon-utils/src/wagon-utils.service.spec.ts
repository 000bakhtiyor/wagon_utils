import { Test, TestingModule } from '@nestjs/testing';
import { WagonUtilsService } from './wagon-utils.service';

describe('WagonUtilsService', () => {
  let service: WagonUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WagonUtilsService],
    }).compile();

    service = module.get<WagonUtilsService>(WagonUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
