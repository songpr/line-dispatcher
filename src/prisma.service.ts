import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaService.name);

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`onApplicationShutdown: ${signal}`);
    await this.$disconnect();
    this.logger.log('prisma db disconnected');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('prisma db disconnected');
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('prisma db connected');
  }
}
