import {
  RabbitMQConfigModule,
  RabbitMQService,
  TASK_EXCHANGE,
  TYPE_EXCHANGE,
  USER_EXCHANGE,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiController } from './api.controller';
import { jwtConstants } from './common/constants';
import { ApiService } from './services/api.service';

@Module({
  imports: [
    RabbitMQConfigModule.register([
      { name: USER_EXCHANGE, type: TYPE_EXCHANGE },
      { name: TASK_EXCHANGE, type: TYPE_EXCHANGE },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, ConfigService, RabbitMQService],
})
export class ApiModule {}
