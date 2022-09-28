import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'Token entity' })
@Entity('tokenentity')
export class TokenEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  token: string;
}
