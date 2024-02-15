import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.input';
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
  findAll() {
    return this.todosService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.remove(id);
  }
}
