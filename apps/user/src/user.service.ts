import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

interface Message {
  type: string;
  data: any;
}

@Injectable()
export class UserService {
  @RabbitSubscribe({
    exchange: 'users',
    routingKey: 'users-route',
    queue: 'users-queue',
  })
  public async puSubHandler(msg: Message) {
    switch (msg.type) {
      case 'create':
        this.crateUser(msg.data);
      case 'delete':
        this.deleteUser(msg.data);
    }
  }

  async crateUser(data: any) {
    console.log(`Received message: ${JSON.stringify(data)}`);
  }

  async deleteUser(data: any) {
    console.log(`Received message: ${JSON.stringify(data)}`);
  }
}
