import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ description: '昵称' })
  name: string;
  @Field({ description: '简介', nullable: true })
  desc?: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
