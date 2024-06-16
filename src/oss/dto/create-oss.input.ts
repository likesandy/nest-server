import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOssInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
