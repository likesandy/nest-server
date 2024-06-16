import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { UserService } from './user.service';

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

  @Mutation(() => UserType, { description: '查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }

  @Mutation(() => Boolean, { description: '更新用户' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }
}
