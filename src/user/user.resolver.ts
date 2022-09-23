import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokenResponseDTO } from './dto/token-response.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}

  @Query(() => [UserEntity])
  async getAll() {
    return await this.userService.findAllUser();
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
      token: "lfksjdflakj"
    }
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }
}
