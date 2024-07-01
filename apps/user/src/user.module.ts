import { MongoModule, RabbitMQConfigModule } from '@app/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './repositories/user.repository';
import { TASK_EXCHANGE, USER_EXCHANGE } from './common/constants/user';
import { UserFactory } from './factories/user.factory';

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
