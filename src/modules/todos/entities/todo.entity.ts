import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TodoPriorityType, TodoStatusType } from './todo-type.entity';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;


  @Field({ defaultValue: TodoStatusType })
  status: TodoStatusType;

  @Field()
  priority: TodoPriorityType;

  @Field()
  dueDate: string;

}
