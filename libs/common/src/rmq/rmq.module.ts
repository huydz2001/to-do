import {
  RabbitMQModule,
  RabbitRpcParamsFactory,
} from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, InjectionToken, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQConfigService } from './rmq.service';

interface Exchange {
  name: string;
  type: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class RmqModule {
  static register(exchanges: Exchange[]): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: [ConfigModule],
          inject: [RabbitMQConfigService, RabbitRpcParamsFactory],
          useFactory: (rmqConfigService: RabbitMQConfigService) =>
            rmqConfigService.getRabbitMQConfig(exchanges),
        }),
      ],
      providers: [ConfigService, RabbitMQConfigService],
    };
  }
}
