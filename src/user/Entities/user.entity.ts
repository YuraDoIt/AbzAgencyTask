import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PositionEntity } from 'src/positions/entity/position.entity';

@ObjectType({ description: 'User entity' })
@Entity('userentity')
export class UserEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String, { nullable: true })
  @Min(2)
  @Max(60)
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field(() => Number, { nullable: true })
  @Min(1)
  @Column('int', { nullable: true })
  position_id: number;

  @Field(() => Number, { nullable: true })
  @Column('bigint', { nullable: true })
  registration_timestamp: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field(() => UserEntity)
  @ManyToOne(() => PositionEntity, (position) => position.users)
  position?: PositionEntity;
}
