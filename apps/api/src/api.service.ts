import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private ampConnection: AmqpConnection) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser() {
    this.ampConnection.publish('users', 'users-route', {
      type: 'create',
      data: { name: 'test', age: '23' },
    });
    console.log('message publish:', { data: { name: 'test', age: '23' } });
  }

  createTask() {
    this.ampConnection.publish('tasks', 'tasks-route', {
      type: 'create',
      data: { task_name: 'test', start_date: '2024-06-28' },
    });
    console.log('message publish:', {
      data: { task_name: 'test', start_date: '2024-06-28' },
    });
  }
}
