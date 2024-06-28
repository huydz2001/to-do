import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '././.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const RMQ_USER = configService.get('RABBITMQ_USER');
        const RMQ_PASS = configService.get('RABBITMQ_PASS');
        const RMQ_HOST = configService.get('RABBITMQ_HOST');
        const RMQ_PORT = configService.get('RABBITMQ_PORT');
        return {
          exchanges: [
            {
              name: 'users',
              type: 'topic',
            },
          ],
          uri: `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`,
          connectionInitOptions: { wait: false },
        };
      },
    }),
    UserModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
