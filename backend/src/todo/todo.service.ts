import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    return this.repo.save(createTodoDto);
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.repo.update(id, updateTodoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
