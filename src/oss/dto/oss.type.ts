import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OssType {
  @Field(() => String, { description: '策略' })
  policy: string;
  @Field(() => String, { description: '签名' })
  signature: string;
  @Field(() => String, { description: '密钥' })
  accessId: string;
  @Field(() => String, { description: '目录' })
  dir: string;
  @Field(() => String, { description: 'host' })
  host: string;
  @Field(() => String, { description: '过期时间' })
  expire: string;
}
