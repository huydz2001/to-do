import { RabbitRpcParamsFactory } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface Exchange {
  name: string;
  type: string;
}

export interface RabbitMQModuleOptions {
  uri: string;
  exchanges?: Exchange[];
  connectionInitOptions?: {
    wait?: boolean;
    timeout?: number;
    reconnectTimeInMs?: number;
  };
}
@Module({
  imports: [ConfigModule],
  providers: [ConfigService],
})
@Injectable()
export class RabbitMQConfigService {
  constructor(private configService: ConfigService) {}

  getRabbitMQConfig(exchanges: Exchange[]): RabbitMQModuleOptions {
    const RMQ_USER = this.configService.get('RABBITMQ_USER');
    const RMQ_PASS = this.configService.get('RABBITMQ_PASS');
    const RMQ_HOST = this.configService.get('RABBITMQ_HOST');
    const RMQ_PORT = this.configService.get('RABBITMQ_PORT');

    console.log(`amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`);
    return {
      exchanges: exchanges,
      uri: `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`,
      connectionInitOptions: {
        wait: false,
      },
    };
  }
}
