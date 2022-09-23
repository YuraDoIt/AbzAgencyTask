import { ObjectType, ID, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {IsEmail} from 'class-validator'

@ObjectType({ description: 'User entity' })
@Entity('userentity')
export class UserEntity {
  @Field(() => ID, { nullable: true})
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true})
  name: string;

  @Field(() => String, { nullable: true})
  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @Field(() => String, { nullable: true})
  @Column({  nullable: true })
  phone: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true, default: '1' })
  position: string;

  @Field(() => Number, { nullable: true})
  @Column({ nullable: true })
  position_id: number;

  @Field(() => Number, { nullable: true})
  @Column({ nullable: true })
  registration_timestamp: number;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true})
  photo: string;
}