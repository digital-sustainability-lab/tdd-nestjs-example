import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
jest.mock('./todo.service');

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('POST should call service to save todo', () => {
    const createDto: CreateTodoDto = {
      title: 'Create TDD Nest',
    };
    controller.create(createDto);
    expect(service.create).toBeCalledTimes(1);
    expect(service.create).toBeCalledWith(createDto);
  });
});
