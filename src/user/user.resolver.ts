import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async getAll() {
    return await this.userService.findAllUser(5);
  }
}
