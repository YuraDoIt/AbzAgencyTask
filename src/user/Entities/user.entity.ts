import { ObjectType, ID, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {IsEmail} from 'class-validator'

@ObjectType({ description: 'User entity' })
@Entity('user')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  id: number;

  @Field(() => String)
  @Column()
  firstname: string;

  @Field(() => String)
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;
}