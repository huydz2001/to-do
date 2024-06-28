import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    // RmqModule.register([
    //   { name: 'TASKS', type: 'topic' },
    //   { name: 'USERS', type: 'topic' },
    // ]),
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
              name: 'tasks',
              type: 'topic',
            },
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
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
