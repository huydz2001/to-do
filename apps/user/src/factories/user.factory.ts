import { hashPass } from 'apps/api/src/common/utils';
import { CreateUserRequestDto } from '../../../api/src/dtos/users/createUserRequest.dto';
import { User } from '../schema/user.schema';

export class UserFactory {
  convertUserCreateRequestForUser(user: CreateUserRequestDto) {
    return new User({
      user_name: user.user_name,
      email: user.email,
      password: hashPass(user.password),
      avatar: null,
      dob: null,
      status: null,
    });
  }
}
