import {
  USER_CREATE_USER_ROUTING_KEY,
  USER_EXCHANGE,
  USER_FIND_USER_ROUTING_KEY,
  USER_UPDATE_USER_ROUTING_KEY,
} from '@app/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'apps/user/src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/users';

@Injectable()
export class ApiService {
  constructor(
    private ampConnection: AmqpConnection,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(request: CreateUserRequestDto) {
    const response = await this.ampConnection.request({
      exchange: USER_EXCHANGE,
      routingKey: USER_CREATE_USER_ROUTING_KEY,
      payload: {
        data: request,
      },
    });
    return response;
  }

  async sigin(request: LoginUserRequestDto) {
    const userResponse: User = await this.ampConnection.request({
      exchange: USER_EXCHANGE,
      routingKey: USER_FIND_USER_ROUTING_KEY,
      payload: {
        data: request.email,
      },
    });

    if (!bcrypt.compare(request.password, userResponse?.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: userResponse._id,
      username: userResponse.user_name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async update(id: any, request: UpdateUserRequestDto) {
    const userResponse: User = await this.ampConnection.request({
      exchange: USER_EXCHANGE,
      routingKey: USER_UPDATE_USER_ROUTING_KEY,
      payload: {
        data: request,
        userId: id,
      },
    });

    if (userResponse) {
      return {
        code: 'MSG001',
        message: 'Success',
        data: null,
      };
    }
  }
}
