import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoPriorityType, TodoStatusType } from '../entities/todo-type.entity';

@InputType()
export class CreateTodoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(TodoStatusType)
  status: TodoStatusType;

  @Field()
  @IsNotEmpty()
  @IsEnum(TodoPriorityType)
  priority: TodoPriorityType;

}
