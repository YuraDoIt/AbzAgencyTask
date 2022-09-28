import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAllUser(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    console.log(users);
    return await this.userRepo.find();
  }

  async createUser(UserCreateDTO: UserCreateDTO): Promise<UserEntity> {
    const emailRegExp = new RegExp(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );

    const phoneRegExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);

    if (UserCreateDTO.name.length < 2 || UserCreateDTO.name.length > 60) {
      throw new GraphQLError('length of name shoult be > 2 and < 60');
    }

    if (!emailRegExp.test(UserCreateDTO.email)) {
      throw new GraphQLError('mail not match with real mail');
    }

    if (!phoneRegExp.test(UserCreateDTO.phone)) {
      throw new GraphQLError('phone not match with correct phone(+380)');
    }

    if (
      UserCreateDTO.position_id < 1 &&
      typeof UserCreateDTO.position_id != 'bigint'
    ) {
      throw new GraphQLError('position_is should be > 1');
    }

    let userData: UserEntity = await this.userRepo.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone: UserCreateDTO.phone,
      position_id: UserCreateDTO.position_id,
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
    });

    const token = await this.tokenGenerate();
    console.log(token);

    await this.userRepo.insert(userData);
    return userData;
  }

  async createUserMessage(UserCreateDTO: UserCreateDTO): Promise<UserEntity> {
    let fails = {};

    const emailRegExp = new RegExp(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );

    const phoneRegExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);

    if (UserCreateDTO.name.length < 2 || UserCreateDTO.name.length > 60) {
      throw new GraphQLError('length of name shoult be > 2 and < 60');
    }

    if (!emailRegExp.test(UserCreateDTO.email)) {
      throw new GraphQLError('mail not match with real mail');
    } else {
      Object.assign(fails, {
        email: ['The email must be a valid email address.'],
      });
    }

    if (!phoneRegExp.test(UserCreateDTO.phone)) {
      throw new GraphQLError('phone not match with correct phone(+380)');
    }

    if (
      UserCreateDTO.position_id < 1 &&
      typeof UserCreateDTO.position_id != 'bigint'
    ) {
      throw new GraphQLError('position_is should be > 1');
    }

    let userData: UserEntity = await this.userRepo.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone: UserCreateDTO.phone,
      position_id: UserCreateDTO.position_id,
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
    });

    const token = await this.tokenGenerate();
    console.log(token);

    await this.userRepo.insert(userData);
    return userData;
  }

  async seedUsers(): Promise<UserEntity[]> {
    const userArray: UserEntity[] = [];

    for (let i = 0; i < 45; i++) {
      const seedUser = await this.userRepo.create({
        email: faker.internet.email(),
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        registration_timestamp: Date.now(),
      });
      userArray.push(seedUser);
    }

    await this.userRepo.insert(userArray);
    console.log(await this.getUserCount());
    return userArray;
  }

  async seedUsersSucess() {
    const userArray: UserEntity[] = [];

    for (let i = 0; i < 45; i++) {
      const seedUser = await this.userRepo.create({
        email: faker.internet.email(),
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        registration_timestamp: Date.now(),
      });
      userArray.push(seedUser);
    }

    await this.userRepo.insert(userArray);
    console.log(await this.getUserCount());
    return {
      success: 'sucess',
      data: userArray,
    };
  }

  async tokenGenerate(): Promise<{
    success: boolean;
    token: any;
  }> {
    let token = await this.jwtService.signAsync({}, { expiresIn: '40m' });
    console.log(token);

    if (token) {
      return { success: true, token: token };
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new GraphQLError('User not registered yet, try again');
    }
    return user;
  }

  async getUserCount(): Promise<number> {
    return await this.userRepo.count();
  }

  async filterUser(filter: FilterUserDto): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
}
