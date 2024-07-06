import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from '../todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from '@prisma/client';

@ApiTags('todos')
@Controller({
  path: 'todos',
  version: '1',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiResponse({ status: 200, description: 'Return the todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  remove(@Param('id') id: number): Promise<Todo> {
    return this.todoService.remove(id);
  }
}