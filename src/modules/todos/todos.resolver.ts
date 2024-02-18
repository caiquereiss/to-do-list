import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoFilterEntity } from './entities/todo-filter.entity';
import { TodoListOptions } from './entities/todo-list-options';
import { Todo } from './entities/todo.entity';
import { TodosService } from './services/todos.service';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) { }

  @Mutation(() => Todo)
  createTodo(
    @Args('userId') @ActiveUserId() userId: string,
    @Args('createTodoDto') createTodoDto: CreateTodoDto) {
    return this.todosService.create(userId, createTodoDto);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll(
    @Args('userId') @ActiveUserId() userId: string,
    @Args('filters', { nullable: true, defaultValue: {} }) filters: TodoFilterEntity,
    @Args('options', { nullable: true, defaultValue: {} }) options: TodoListOptions,


  ) {

    return this.todosService.findAllByUserId(userId, options, filters);
  }

  // @Query(() => Todo, { name: 'todo' })
  // findOne(
  //   @Args('userId') @ActiveUserId() userId: string,
  //   @Args('id', { type: () => Int }) id: string) {
  //   return this.todosService.findOneByUserId(userId, id);
  // }

  @Mutation(() => Todo)
  updateTodo(
    @Args('userId') @ActiveUserId() userId: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ) {
    return this.todosService.update(userId, updateTodoInput.todoId, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(
    @Args('userId') @ActiveUserId() userId: string,
    @Args('todoId', { type: () => String }) todoId: string
  ) {
    return this.todosService.remove(userId, todoId);
  }
}
