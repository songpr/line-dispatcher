import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from "crypto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineSignatureGuard implements CanActivate {
  private readonly logger = new Logger(LineSignatureGuard.name);
  constructor(private configService: ConfigService) { }
  private readonly channelSecret = this.configService.get<string>('LINE_CHANNEL_SECRET');
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //fastify request object
    const request = context.switchToHttp().getRequest();
    const xLineSignature = request.headers['x-line-signature'];
    if (xLineSignature !== null && xLineSignature !== undefined) {
      this.logger.debug("webhook-event:x-line-signature", xLineSignature)
      const body = request.rawBody; // Request body string
      this.logger.debug("webhook-event:rawBody", body)
      const signature = crypto
        .createHmac("SHA256", this.channelSecret)
        .update(body)
        .digest("base64");
      this.logger.debug("webhook-event:line-signature", signature)
      return xLineSignature === signature;
    }
    return false;
  }
}
