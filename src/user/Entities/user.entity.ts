import { ObjectType, ID, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import {IsEmail, Min, Max, Matches} from 'class-validator'
import { PositionEntity } from "../../positions/entity/position.entity";

@ObjectType({ description: 'User entity' })
@Entity('userentity')
export class UserEntity {
  @Field(() => ID, { nullable: true})
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Field(() => String, { nullable: true})
  @Min(2)
  @Max(60)
  @Column({ nullable: true})
  name: string;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true })
  email: string;

  @Field(() => String, { nullable: true})
  @Column({  nullable: true })
  phone: string;

  @Field(() => Number, { nullable: true})
  @Min(1)
  @Column('int', { nullable: true })
  position_id: number;

  @Field(() => Number, { nullable: true})
  @Column('bigint', { nullable: true})
  registration_timestamp: number;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true})
  photo: string;

  // @ManyToOne(() => PositionEntity, (position) => position.users)
  // position?: PositionEntity;
}