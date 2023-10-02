import { LineSignatureGuard } from './line-signature.guard';
import { ConfigService } from '@nestjs/config';

describe('LineSignatureGuard', () => {
  it('should be defined', () => {
    expect(new LineSignatureGuard(new ConfigService())).toBeDefined();
  });
});
