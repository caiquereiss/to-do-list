import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { ValidateTodoOwnershipService } from './services/validate-todo-ownership.service';
import { TodosResolver } from './todos.resolver';

@Module({
  providers: [TodosResolver, TodosService, ValidateTodoOwnershipService],
  exports: [TodosService],
})
export class TodosModule { }
