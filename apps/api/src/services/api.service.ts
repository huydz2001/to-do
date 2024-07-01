import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  USER_CREATED_USER_ROUTING_KEY,
  USER_EXCHANGE,
} from '../common/constants';
import { CreateUserRequestDto } from 'apps/user/src/dtos/createUserRequest.dto';

@Injectable()
export class ApiService {
  constructor(private ampConnection: AmqpConnection) {}

  createUser(user: CreateUserRequestDto) {
    this.ampConnection.publish(USER_EXCHANGE, USER_CREATED_USER_ROUTING_KEY, {
      data: user,
    });
    console.log('message publish:', user);
  }

  createTask() {}
}
