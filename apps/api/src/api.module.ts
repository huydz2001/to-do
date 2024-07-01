import { RabbitMQConfigModule, RabbitMQService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ApiService } from './services/api.service';
import { TASK_EXCHANGE, USER_EXCHANGE } from './common/constants';

@Module({
  imports: [
    RabbitMQConfigModule.register([
      { name: USER_EXCHANGE, type: 'topic' },
      { name: TASK_EXCHANGE, type: 'topic' },
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService, ConfigService, RabbitMQService],
})
export class ApiModule {}
