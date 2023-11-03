import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  /**
   *
   * @param configService
   * @see https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
   */
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const greeting = this.configService.get<string>('GREETING');
    if (greeting) {
      return greeting;
    }
    return 'Hello World!';
  }
}
