import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType({ description: 'User create dto' })
export class UserCreateDTO {
  @Field(() => String, {nullable: true})
  name: string;

  @Field(() => String, {nullable: true})
  @IsEmail()
  email: string;

  @Field(() => String, {nullable: true})
  phone: string;

  @Field(() => String, {nullable: true})
  position: string;

  @Field(() => Number, {nullable: true})
  position_id: number;

  @Field(() => Number, {nullable: true})
  registration_timestamp: number;

  @Field(() => String, {nullable: true})
  photo: string;
}