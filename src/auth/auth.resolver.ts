import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Result } from './dto/result.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Result, { description: '发送短信验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<Result> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Result, { description: '登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<Result> {
    return this.authService.login(tel, code);
  }
}
