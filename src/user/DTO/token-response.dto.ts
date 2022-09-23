import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@ObjectType({ description: 'Token generate response' })
export class TokenResponseDTO {
  @Field(() => Boolean, {nullable: true})
  success: boolean;

  @Field(() => String, {nullable: true})
  @IsEmail()
  token: string;
}