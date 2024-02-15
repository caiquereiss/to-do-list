import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosRepository {
  constructor(private readonly prismaService: PrismaService) { }

  findMany(findManyDto: Prisma.TodoFindManyArgs) {
    return this.prismaService.todo.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.TodoFindFirstArgs) {
    return this.prismaService.todo.findFirst(findFirstDto);
  }

  create(createDto: Prisma.TodoCreateArgs) {
    return this.prismaService.todo.create(createDto);
  }

  update(updateDto: Prisma.TodoUpdateArgs) {
    return this.prismaService.todo.update(updateDto);
  }
  delete(deleteDto: Prisma.TodoDeleteArgs) {
    return this.prismaService.todo.delete(deleteDto);
  }


}
