import {
  MongoModule,
  RabbitMQConfigModule,
  TASK_EXCHANGE,
  USER_EXCHANGE,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { UserFactory } from './factories/user.factory';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.apps/user/.env',
      validationSchema: Joi.object({
        MONGO_DB_URL: Joi.string().required(),
      }),
    }),
    RabbitMQConfigModule.register([
      { name: USER_EXCHANGE, type: 'topic' },
      { name: TASK_EXCHANGE, type: 'topic' },
    ]),
    MongoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFactory],
})
export class UserModule {}
