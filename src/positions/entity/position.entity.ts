import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@ObjectType({ description: 'Position entity' })
@Entity('userentity')
export class PositionEntity {
  @Field(() => ID, { nullable: true})
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Field(() => String, { nullable: true})
  @Column({ nullable: true})
  name: string;

  // @OneToMany(() => UserEntity, (user) => user.position)
  // users?: UserEntity[];
}