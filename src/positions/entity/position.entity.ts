import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType({ description: 'Position entity' })
@Entity('position')
export class PositionEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field(() => [UserEntity], { nullable: true })
  @OneToMany(() => UserEntity, (user) => user.position)
  users?: UserEntity[];
}
