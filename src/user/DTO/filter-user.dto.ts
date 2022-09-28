import { Field, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class FilterUserDto {
  @Field()
  @Min(1)
  page: number;

  @Field()
  @Min(1)
  offset: number;

  @Field()
  @Min(1)
  @Max(100)
  count: number;
}
