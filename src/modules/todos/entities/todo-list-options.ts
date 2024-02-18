import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TodoListOptions {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  take?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number;

  @Field(() => String, { defaultValue: 'createdAt' })
  orderBy?: 'dueDate' | 'createdAt';

  @Field(() => String, { defaultValue: 'asc' })
  orderDirection?: 'asc' | 'desc';
}
