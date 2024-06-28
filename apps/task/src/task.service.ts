import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  @RabbitSubscribe({
    exchange: 'tasks',
    routingKey: 'tasks-route',
    queue: 'tasks-queue',
  })
  createTask(msg: {}) {
    console.log('Message response: ', msg);
  }
}
