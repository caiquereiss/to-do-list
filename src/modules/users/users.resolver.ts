import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// @IsPublic()
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }


  @Query(() => User, { name: 'me' })
  async me(@Args('userId') @ActiveUserId() userId: string) {
    const user = await this.usersService.getUserById(userId);
    return user
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
