import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TodosRepository } from './repositories/todos.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, TodosRepository],
  exports: [UsersRepository, TodosRepository],
})
export class DatabaseModule { }
