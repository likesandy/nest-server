import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  id?: string;
  @Field({ description: '昵称' })
  name: string;
  @Field({ description: '描述' })
  desc: string;
  @Field({ description: '手机号' })
  tel: string;
  @Field({ description: '头像' })
  avatar: string;
  @Field({ description: '验证码' })
  code: string;
  @Field({ description: '验证码生成时间' })
  codeCreateTimeAt: Date;
}
