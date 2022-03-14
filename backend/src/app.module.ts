import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo } from './todo/entities/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      entities: [Todo],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
