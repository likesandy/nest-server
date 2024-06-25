import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '@/guards/auth.guard';
import { Result } from '@/auth/dto/result.type';
import { SUCCESS, UPDATE_ERROR } from '@/common/constants/code';

@Resolver()
@UseGuards(GQLAuthGuard)
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

  @Mutation(() => Result, { description: '更新用户' })
  async updateUserInfo(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<Result> {
    const res = await this.userService.update(id, params);
    if (res) {
      return {
        code: SUCCESS,
        message: '更新成功',
      };
    }
    return {
      code: UPDATE_ERROR,
      message: '更新失败',
    };
  }

  @Query(() => UserType, { description: '获取当前用户信息' })
  async getUserInfo(@Context() ctx: any): Promise<UserType> {
    const id = ctx.req.user.id;
    return await this.userService.find(id);
  }
}
