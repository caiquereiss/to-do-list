import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoDto } from './create-todo.dto';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoDto) {
  @Field(() => String)
  todoId: string;
}
