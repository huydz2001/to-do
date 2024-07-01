import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty({ message: 'UserName must be not empty' })
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password must be not empty' })
  password: string;
}
