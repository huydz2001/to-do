import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { CreateUserRequestDto } from 'apps/user/src/dtos/createUserRequest.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Post('user')
  createUser(@Body() user: CreateUserRequestDto) {
    return this.apiService.createUser(user);
  }

  @Post('task')
  createTask() {
    console.log(123);
    return this.apiService.createTask();
  }
}
