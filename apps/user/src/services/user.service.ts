import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos/createUserRequest.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserFactory } from '../factories/user.factory';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  @RabbitSubscribe({
    exchange: 'users',
    routingKey: 'users.created',
    queue: 'users.#',
  })
  async crateUser(msg: any) {
    const session = await this.userRepo.startTransaction();
    console.log(msg.data);
    const userModel = this.userFactory.convertUserCreateRequestForUser(
      msg.data,
    );
    console.log(userModel);
    const createdUser = this.userRepo.create(userModel);
    session.commitTransaction();
  }

  async deleteUser(data: any) {
    console.log(`Received message: ${JSON.stringify(data)}`);
  }
}
