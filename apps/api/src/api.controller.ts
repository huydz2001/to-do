import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Post('user')
  createUser() {
    return this.apiService.createUser();
  }

  @Post('task')
  createTask() {
    return this.apiService.createTask();
  }
}
