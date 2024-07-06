import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, Prisma } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.todoService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.todoService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.remove(+id);
  }
}