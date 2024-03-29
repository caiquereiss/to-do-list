import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  accessToken: string;
}
