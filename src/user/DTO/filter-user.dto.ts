import { Field, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

export class FilterUserDto {
  @Min(1)
  page: number;

  @Min(1)
  offset: number;

  @Min(1)
  @Max(100)
  count: number;
}
