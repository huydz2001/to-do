import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
  UpdateUserRequestDto,
} from './dtos/users';
import { ApiService } from './services/api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('users')
  createUser(@Body() user: CreateUserRequestDto) {
    return this.apiService.createUser(user);
  }

  @Post('users/login')
  login(@Body() user: LoginUserRequestDto) {
    return this.apiService.sigin(user);
  }

  @UseGuards(AuthGuard)
  @Patch('users/:id/update')
  update(@Body() user: UpdateUserRequestDto, @Request() req) {
    const id = req['user'].userId;
    return this.apiService.update(id, user);
  }
}
