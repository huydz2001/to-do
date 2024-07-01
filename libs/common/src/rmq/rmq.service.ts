import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

export class RabbitMQService {
  constructor(private readonly ampConnection: AmqpConnection) {}
  async publishMessage(exchange: string, routing_key: string, data: any) {
    try {
      await this.ampConnection.publish(
        exchange,
        routing_key,
        Buffer.from(data),
      );
    } catch (error) {
      console.error(error);
    }
  }
}
