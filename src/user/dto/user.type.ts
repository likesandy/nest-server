import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field({ description: '用户ID' })
  id?: string;
  @Field({ description: '昵称' })
  name: string;
  @Field({ description: '描述' })
  desc: string;
  @Field({ description: '手机号' })
  tel: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
