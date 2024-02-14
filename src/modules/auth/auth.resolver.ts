import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthService } from './auth.service';
import { SigninInput } from './dto/signin-dto';
import { SignupInput } from './dto/signup-dto';
import { Auth } from './entities/auth.entity';


@IsPublic()
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }



  @Mutation(() => Auth, { name: 'signin' })
  async signin(@Args('input') input: SigninInput): Promise<Auth> {
    return this.authService.signin(input);
  }


  @Mutation(() => Auth, { name: 'signup' })
  async signup(@Args('input') input: SignupInput): Promise<Auth> {
    return this.authService.signup(input);
  }
}
