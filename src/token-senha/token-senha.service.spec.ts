import { Test, TestingModule } from '@nestjs/testing';
import { TokenSenhaService } from './token-senha.service';

describe('TokenSenhaService', () => {
  let service: TokenSenhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenSenhaService],
    }).compile();

    service = module.get<TokenSenhaService>(TokenSenhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
