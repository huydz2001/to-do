import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { CreateUserRequestDto } from 'apps/user/src/dtos/createUserRequest.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('user')
  createUser(@Body() user: CreateUserRequestDto) {
    return this.apiService.createUser(user);
  }
}
