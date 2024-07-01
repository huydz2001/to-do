import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfigModule } from '@app/common';

@Module({
  imports: [
    RabbitMQConfigModule.register([{ name: 'tasks', type: 'topic' }]),
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
