import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
              name: 'tasks',
              type: 'topic',
            },
          ],
          uri: `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`,
          connectionInitOptions: { wait: false },
        };
      },
    }),
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
