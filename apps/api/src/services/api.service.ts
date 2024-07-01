import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { USER_CREATED_ROUTING_KEY, USER_EXCHANGE } from '../common/constants';
import { CreateUserRequestDto } from 'apps/user/src/dtos/createUserRequest.dto';

@Injectable()
export class ApiService {
  constructor(private ampConnection: AmqpConnection) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(user: CreateUserRequestDto) {
    this.ampConnection.publish(USER_EXCHANGE, USER_CREATED_ROUTING_KEY, {
      data: user,
    });
    console.log('message publish:', user);
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
