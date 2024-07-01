import {
  USER_CREATE_QUEUE,
  USER_CREATE_USER_ROUTING_KEY,
  USER_EXCHANGE,
  USER_FIND_QUEUE,
  USER_FIND_USER_ROUTING_KEY,
  USER_QUEUE,
  USER_UPDATE_QUEUE,
  USER_UPDATE_USER_ROUTING_KEY,
} from '@app/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UserFactory } from '../factories/user.factory';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC({
    exchange: USER_EXCHANGE,
    routingKey: USER_CREATE_USER_ROUTING_KEY,
    queue: USER_CREATE_QUEUE,
  })
  async createUser(msg: any) {
    try {
      const session = await this.userRepo.startTransaction();
      const userModel = this.userFactory.convertUserCreateRequestForUser(
        msg.data,
      );
      const createdUser = await this.userRepo.create(userModel);
      await session.commitTransaction();

      return createdUser;
    } catch (error) {
      console.error(error);
    }
  }

  @RabbitRPC({
    exchange: USER_EXCHANGE,
    routingKey: USER_FIND_USER_ROUTING_KEY,
    queue: USER_FIND_QUEUE,
  })
  async findByEmail(msg: any) {
    try {
      const user = this.userRepo.findOne({ email: msg.data });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @RabbitRPC({
    exchange: USER_EXCHANGE,
    routingKey: USER_UPDATE_USER_ROUTING_KEY,
    queue: USER_UPDATE_QUEUE,
  })
  async update(msg: any) {
    try {
      const user = await this.userRepo.findOneAndUpdate(
        {
          _id: msg.userId,
        },
        msg.data,
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
