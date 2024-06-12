import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String, { description: '测试' })
  hello(): string {
    return 'Hello World!';
  }

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }
}
