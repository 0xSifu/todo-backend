import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [PrismaModule, RabbitMQModule, RedisModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}