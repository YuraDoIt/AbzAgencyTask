import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilterUserDto } from './dto/filter-user.dto';
import { TokenResponseDTO } from './dto/token-response.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async getAll() {
    return await this.userService.findAllUser();
  }

  @Query(() => [UserEntity])
  async users(@Args('filter') filter: FilterUserDto) {
    return await this.userService.filterUser(filter);
  }

  @Mutation(() => UserEntity)
  async create(@Args('UserCreateDTO') userCreateDTO: UserCreateDTO) {
    return this.userService.createUser(userCreateDTO);
  }

  @Mutation(() => [UserEntity])
  async genSeeds(): Promise<UserEntity[]> {
    return await this.userService.seedUsers();
  }

  @Mutation(() => TokenResponseDTO)
  async tokenGenerate(): Promise<TokenResponseDTO> {
    return {
      success: true,
      token: 'lfksjdflakj',
    };
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }
}
