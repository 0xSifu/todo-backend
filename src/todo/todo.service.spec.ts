import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RedisService } from '../redis/redis.service';
import { Todo } from '@prisma/client';

describe('TodoService', () => {
  let service: TodoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: RabbitMQService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos: Todo[] = [
        { id: 1, title: 'Todo 1', description: 'Description 1', completed: false },
        { id: 2, title: 'Todo 2', description: 'Description 2', completed: true },
      ];
      jest.spyOn(prismaService.todo, 'findMany').mockResolvedValue(mockTodos);

      const result = await service.findAll();
      expect(result).toEqual(mockTodos);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      const mockTodo: Todo = { id: 1, title: 'Todo 1', description: 'Description 1', completed: false };
      jest.spyOn(prismaService.todo, 'findUnique').mockResolvedValue(mockTodo);

      const result = await service.findOne(1);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodoData = { title: 'New Todo', description: 'New Description', completed: false };
      const createdTodo: Todo = { id: 1, ...newTodoData };
      jest.spyOn(prismaService.todo, 'create').mockResolvedValue(createdTodo);

      const result = await service.create(newTodoData);
      expect(result).toEqual(createdTodo);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const updateData = { title: 'Updated Todo' };
      const updatedTodo: Todo = { id: 1, title: 'Updated Todo', description: 'Description 1', completed: false };
      jest.spyOn(prismaService.todo, 'update').mockResolvedValue(updatedTodo);

      const result = await service.update(1, updateData);
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('delete', () => {
    it('should delete an existing todo', async () => {
      const deleteResult = { id: 1, title: 'Deleted Todo', description: 'Description 1', completed: false };
      jest.spyOn(prismaService.todo, 'delete').mockResolvedValue(deleteResult);

      const result = await service.remove(1);
      expect(result).toEqual(deleteResult);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});