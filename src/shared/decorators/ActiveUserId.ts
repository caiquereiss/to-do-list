import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getArgs();

    const userId = request.userId;


    if (!userId) {
      throw new UnauthorizedException();
    }
    return userId;
  },
);
