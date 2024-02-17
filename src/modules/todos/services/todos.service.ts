import { Injectable, NotFoundException } from '@nestjs/common';
import { TodosRepository } from 'src/shared/database/repositories/todos.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoInput } from '../dto/update-todo.input';
import { TodoPriorityType, TodoStatusType } from '../entities/todo-type.entity';
import { ValidateTodoOwnershipService } from './validate-todo-ownership.service';

@Injectable()
export class TodosService {
  constructor(
    private readonly todosRepo: TodosRepository,
    private readonly validateTodoOwnershipService: ValidateTodoOwnershipService,
    private readonly usersRepo: UsersRepository,
  ) { }

  async create(userId: string, createTodoDto: CreateTodoDto) {
    const { title, description, dueDate, priority, status } = createTodoDto;
    const userAlreadyExists = await this.usersRepo.findUnique({
      where: {
        id: userId
      }
    })

    if (!userAlreadyExists) {
      throw new NotFoundException('User not found.');
    }
    return await this.todosRepo.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        status,
        userId
      }
    })

  }

  findAllByUserId(
    userId: string,
    filters?: {
      month: number,
      year: number,
      status: TodoStatusType,
      priority: TodoPriorityType
    }) {
    const where: any = { userId };

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    if (filters?.year && filters?.month) {
      if (filters.status) {
        where.dueDate = {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        };
      } else {
        where.createdAt = {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        };
      }

    }

    return this.todosRepo.findMany({ where })
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }


  private async ValidateEntitiesOwnership({
    userId,
    todoId,
  }: {
    userId: string;
    todoId?: string;

  }) {
    await Promise.all([
      todoId &&
      this.validateTodoOwnershipService.validate(
        userId,
        todoId,
      ),
    ]);
  }
}
