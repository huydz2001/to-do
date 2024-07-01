import {
  RabbitMQConfigModule,
  RabbitMQService,
  TASK_EXCHANGE,
  TYPE_EXCHANGE,
  USER_EXCHANGE,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiController } from './api.controller';
import { ApiService } from './services/api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMQConfigModule.register([
      { name: USER_EXCHANGE, type: TYPE_EXCHANGE },
      { name: TASK_EXCHANGE, type: TYPE_EXCHANGE },
    ]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, ConfigService, RabbitMQService],
})
export class ApiModule {}
