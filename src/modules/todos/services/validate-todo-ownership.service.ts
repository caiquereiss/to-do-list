import { Injectable, NotFoundException } from '@nestjs/common';
import { TodosRepository } from 'src/shared/database/repositories/todos.repositories';

@Injectable()
export class ValidateTodoOwnershipService {
  constructor(private readonly todosRepo: TodosRepository) { }

  async validate(userId: string, todoId: string) {
    const isOwner = await this.todosRepo.findFirst({
      where: { id: todoId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Todo  not found');
    }
  }
}
