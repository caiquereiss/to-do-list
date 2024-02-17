import { Field, InputType } from '@nestjs/graphql';
import { TodoPriorityType, TodoStatusType } from './todo-type.entity';

@InputType()
export class TodoFilterEntity {
  @Field({ nullable: true })
  year: number;

  @Field({ nullable: true })
  month: number;

  @Field({ nullable: true })
  status: TodoStatusType;

  @Field({ nullable: true })
  priority: TodoPriorityType;
}
