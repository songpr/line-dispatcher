import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LineSignatureGuard implements CanActivate {
  private readonly logger = new Logger(LineSignatureGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //fastify request object
    const request = context.switchToHttp().getRequest();
    const xLineSignature = request.headers['x-line-signature'];
    if (xLineSignature !== null && xLineSignature !== undefined) {
      this.logger.debug("webhook-event:x-line-signature", xLineSignature)
      return true;
    }
    return false;
  }
}
