import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './DTO/user-create.dto';
import { UserEntity } from './Entities/user.entity';
import { faker } from '@faker-js/faker';
import { TokenResponseDTO } from './DTO/token-response.dto';

@Resolver()
export class UserResolver {
  constructor(
  @InjectRepository(UserEntity) private user: Repository<UserEntity>)
  {}

  @Query(() => String)
  async users() {
    return 'hello world';
  }

  @Query(() => [UserEntity])
  async getAll() {
    return await this.user.find();
  }

  @Mutation(() => UserEntity)
  async create(@Args('UserCreateDTO') UserCreateDTO: UserCreateDTO) {

    let userData: UserEntity = await this.user.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
    });

    await this.user.insert(userData);
    return userData
  }

  @Mutation(() => [UserEntity])
  async genSeeds(): Promise<UserEntity[]> {
    const userArray: UserEntity[] = [];

    for(let i=0; i<45; i++) {
      const seedUser = await this.user.create({
        email: faker.internet.email(),
        name: faker.fake.name,
        phone: faker.phone.number(),
        position: faker.random.numeric(10),
        registration_timestamp: Date.now(),
      });
      userArray.push(seedUser)
    }

    return userArray
  }

  @Mutation(() => TokenResponseDTO)
  async tokenGenerate(): Promise<TokenResponseDTO> {
    return {
      success: true,
      token: "lfksjdflakj"
    }
  }
}
