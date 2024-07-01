import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserRequestDto } from './dtos/createUserRequest.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async crateUser(@Body() request: CreateUserRequestDto) {
    return await this.userService.crateUser(request);
  }
}
