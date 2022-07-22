import { Test, TestingModule } from '@nestjs/testing';
import { MongoWrapperService } from './mongo-wrapper.service';

describe('MongoWrapperService', () => {
  let service: MongoWrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoWrapperService],
    }).compile();

    service = module.get<MongoWrapperService>(MongoWrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
