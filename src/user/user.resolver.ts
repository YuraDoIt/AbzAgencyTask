import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './Entities/user.entity';

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>)
    {}

  @Query(() => String)
  async users() {
    return 'hello world';
  }

  // @Query(() => UserEntity)
  // async getAll() {
  //   return await this.user.find();
  // }

  // @Mutation(() => UserEntity)
  // async create(@Args('body') body) {
  //   return await this.user.create(body);
  // }
}
