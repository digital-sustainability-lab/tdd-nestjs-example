import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateTodoDto } from '../src/todo/dto/create-todo.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/todo (POST) should create new todo', async () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test',
      status: 'open',
    };
    const todo = await (
      await request(app.getHttpServer())
        .post('/todo')
        .send(createTodoDto)
        .expect(201)
    ).body;
    expect(todo.id).toBe(1);
    expect(todo.title).toBe('Test');
  });
});
