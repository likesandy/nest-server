import { CreateOssInput } from './create-oss.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOssInput extends PartialType(CreateOssInput) {
  @Field(() => Int)
  id: number;
}
