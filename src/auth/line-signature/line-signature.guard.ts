import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { createHmac } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LineSignatureGuard implements CanActivate {
  private readonly logger = new Logger(LineSignatureGuard.name);
  constructor(private configService: ConfigService) {}
  private readonly channelSecret = this.configService.get<string>(
    'LINE_CHANNEL_SECRET',
  );
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //fastify request object
    const request = context.switchToHttp().getRequest();
    const fastifyRequest = request as FastifyRequest;
    const xLineSignature = fastifyRequest.headers['x-line-signature'];
    if (xLineSignature !== null && xLineSignature !== undefined) {
      const signature = createHmac('SHA256', this.channelSecret)
        .update(request.rawBody)
        .digest('base64');
      this.logger.debug('webhook-event:line-signature', signature);
      return xLineSignature === signature;
    }
    return false;
  }
}
