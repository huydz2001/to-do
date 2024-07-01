import {
  RabbitMQConfig,
  RabbitMQExchangeConfig,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQConfigService {
  constructor(private configService: ConfigService) {}

  getRabbitMQConfig = (exchanges: RabbitMQExchangeConfig[]): RabbitMQConfig => {
    const RMQ_USER = this.configService.get('RABBITMQ_USER');
    const RMQ_PASS = this.configService.get('RABBITMQ_PASS');
    const RMQ_HOST = this.configService.get('RABBITMQ_HOST');
    const RMQ_PORT = this.configService.get('RABBITMQ_PORT');

    const queues: RabbitMQQueueConfig[] = exchanges.map((exchange) => ({
      name: `${exchange.name}.#`,
      exchange: exchange.name,
    }));

    return {
      exchanges,
      queues,
      uri: `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`,
      connectionInitOptions: {
        wait: false,
      },
    };
  };
}
