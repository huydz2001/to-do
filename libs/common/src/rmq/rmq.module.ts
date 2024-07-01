// rabbitmq.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RabbitMQConfig,
  RabbitMQExchangeConfig,
  RabbitMQModule,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfigService } from './rmq.config.service';

// const getRabbitMQConfig = (
//   configService: ConfigService,
//   exchanges: RabbitMQExchangeConfig[],
// ): RabbitMQConfig => {
//   const RMQ_USER = configService.get('RABBITMQ_USER');
//   const RMQ_PASS = configService.get('RABBITMQ_PASS');
//   const RMQ_HOST = configService.get('RABBITMQ_HOST');
//   const RMQ_PORT = configService.get('RABBITMQ_PORT');

//   const queues: RabbitMQQueueConfig[] = exchanges.map((exchange) => ({
//     name: `${exchange.name}.#`,
//     exchange: exchange.name,
//   }));

//   return {
//     exchanges,
//     queues,
//     uri: `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`,
//     connectionInitOptions: {
//       wait: false,
//     },
//   };
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [RabbitMQConfigService],
  exports: [RabbitMQConfigService],
})
export class RabbitMQConfigModule {
  static register(exchanges: RabbitMQExchangeConfig[]): DynamicModule {
    return {
      module: RabbitMQConfigModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          imports: [ConfigModule, RabbitMQConfigModule],
          inject: [RabbitMQConfigService],
          useFactory: (confifService: RabbitMQConfigService) =>
            confifService.getRabbitMQConfig(exchanges),
        }),
      ],
      exports: [RabbitMQModule],
    };
  }
}
