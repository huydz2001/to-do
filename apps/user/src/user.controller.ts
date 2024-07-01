import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from '../../api/src/dtos/users/createUserRequest.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user;
  }
}
