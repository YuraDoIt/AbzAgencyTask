import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from './../token/token.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponse } from './dto/user.response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private tokenService: TokenService,
  ) {}

  async findAllUser(query: any): Promise<UserResponse> {
    let { page, offset } = query;
    if (!page) {
      page = 1;
    }
    if (!offset) {
      offset = 1;
    }

    if (page < 0) {
      throw new HttpException(
        'page must be more than 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (offset < 0) {
      throw new HttpException(
        'offset must be more than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    const users: UserEntity[] = await this.userRepo.find({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: page,
    });
    const count = users.length;

    return {
      success: true,
      page: 1,
      total_pages: 10,
      total_users: await this.getUserCount(),
      count: count,
      links: {
        next_url: 'next_page',
        prev_url: 'prev_page',
      },
      users: users,
    };
  }

  async createUser(UserCreateDTO: UserCreateDTO): Promise<UserEntity> {
    const emailRegExp = new RegExp(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );

    const phoneRegExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);

    if (UserCreateDTO.name.length < 2 || UserCreateDTO.name.length > 60) {
      throw new HttpException(
        'length of name shoult be > 2 and < 60',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!emailRegExp.test(UserCreateDTO.email)) {
      throw new HttpException(
        'mail not match with real mail',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!phoneRegExp.test(UserCreateDTO.phone)) {
      throw new HttpException(
        'phone not match with correct phone(+380)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      UserCreateDTO.position_id < 1 &&
      typeof UserCreateDTO.position_id != 'bigint'
    ) {
      throw new HttpException(
        'position_is should be > 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    let userData: UserEntity = await this.userRepo.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone: UserCreateDTO.phone,
      position_id: UserCreateDTO.position_id,
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
    });

    const token = await this.tokenService.tokenGenerate();
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
      throw new HttpException(
        'length of name shoult be > 2 and < 60',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!emailRegExp.test(UserCreateDTO.email)) {
      throw new HttpException(
        'mail not match with real mail',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      Object.assign(fails, {
        email: ['The email must be a valid email address.'],
      });
    }

    if (!phoneRegExp.test(UserCreateDTO.phone)) {
      throw new HttpException(
        'phone not match with correct phone(+380)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      UserCreateDTO.position_id < 1 &&
      typeof UserCreateDTO.position_id != 'bigint'
    ) {
      throw new HttpException(
        'position_is should be > 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    let userData: UserEntity = await this.userRepo.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone: UserCreateDTO.phone,
      position_id: UserCreateDTO.position_id,
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
    });

    const token = await this.tokenService.tokenGenerate();
    console.log(token);

    await this.userRepo.insert(userData);
    return userData;
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
    // console.log(await this.getUserCount());
    return {
      success: 'sucess',
      data: userArray,
    };
  }

  async getUserById(id: number): Promise<UserEntity> {
    id = Number(id);

    if (typeof id !== 'number') {
      throw new TypeError(`Expected number but got: ${typeof id}`);
    }

    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new HttpException(
        'User not registered yet, try again',
        HttpStatus.BAD_REQUEST,
      );
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
