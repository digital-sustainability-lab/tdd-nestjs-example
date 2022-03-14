import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          entities: [Todo],
          autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([Todo]),
      ],
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(async () => {
    await repository.manager.connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create and save new entry', async () => {
    const spy = jest.spyOn(repository, 'save');
    const createDto: CreateTodoDto = {
      title: 'Testing',
      status: 'open',
    };
    const todo = await service.create(createDto);
    expect(spy).toBeCalledTimes(1);
    const todos = await repository.find({});
    expect(todos.length).toBe(1);
    expect(todo.id).toBe(1);
  });
  it('should update current entry', async () => {
    const findSpy = jest.spyOn(repository, 'findOne');
    const saveSpy = jest.spyOn(repository, 'save');
    const createDto: CreateTodoDto = {
      title: 'Testing',
      status: 'open',
    };
    const todo = await service.create(createDto);
    expect(todo.status).toBe('open');
    const updateDto: UpdateTodoDto = {
      status: 'closed',
    };
    const updatedTodo = await service.update(todo.id, updateDto);
    expect(findSpy).toBeCalledTimes(1);
    expect(saveSpy).toBeCalledTimes(2);
    expect(updatedTodo.status).toBe('closed');
  });
});
