import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    // const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    // console.log("Ta caindo em user?", userId)
    if (!userId) {
      throw new UnauthorizedException();
    }
    return userId;
  },
);
