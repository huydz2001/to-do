import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { STATUS } from '../common/constants/user';

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Prop({ required: true })
  user_name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default:
      'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
  })
  avatar: string;

  @Prop({ default: null })
  dob: string;

  @Prop({ default: STATUS.NOT_JOIN })
  status: number;

  constructor(user: Partial<User>) {
    super();
    this.user_name = user.user_name;
    this.email = user.email;
    this.password = user.password;
    this.avatar =
      user.avatar ||
      'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1';
    this.dob = user.dob || null;
    this.status = user.status || STATUS.NOT_JOIN;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
