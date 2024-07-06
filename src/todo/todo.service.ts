import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RedisService } from '../redis/redis.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    private rabbitMQService: RabbitMQService,
    private redisService: RedisService,
  ) {}

  async findAll(): Promise<Todo[]> {
    const todos = await this.redisService.get('todos');
    if (todos) {
      return JSON.parse(todos);
    }

    const result = await this.prisma.todo.findMany();
    await this.redisService.set('todos', JSON.stringify(result));
    return result;
  }

  async findOne(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    const todo = await this.prisma.todo.create({ data });
    await this.rabbitMQService.sendMessage(`Created Todo: ${todo.title}`);
    await this.redisService.set('todos', JSON.stringify(await this.prisma.todo.findMany()));
    return todo;
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    const todo = await this.prisma.todo.update({
      where: { id },
      data,
    });
    await this.rabbitMQService.sendMessage(`Updated Todo: ${todo.title}`);
    await this.redisService.set('todos', JSON.stringify(await this.prisma.todo.findMany()));
    return todo;
  }

  async remove(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.delete({
      where: { id },
    });
    await this.rabbitMQService.sendMessage(`Deleted Todo: ${todo.title}`);
    await this.redisService.set('todos', JSON.stringify(await this.prisma.todo.findMany()));
    return todo;
  }
}