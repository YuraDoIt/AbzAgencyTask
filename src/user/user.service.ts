import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionEntity } from '../positions/entity/position.entity';
import { PositionService } from '../positions/position.service';
import { TokenService } from './../token/token.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponse } from './dto/user.response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(PositionEntity)
    private positionRepo: Repository<PositionEntity>,
    private tokenService: TokenService,
    private positionService: PositionService,
  ) {}

  async findAllUser(query: any): Promise<UserResponse> {
    let { count, page, offset } = query;
    if (!page) {
      page = 1;
    }
    if (!count) {
      count = 10;
    }
    if (!offset) {
      offset = 5;
    }

    if (page < 0 || count < 0 || offset < 0) {
      throw new HttpException(
        'page || offset || count must be more than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    const users: UserEntity[] = await this.userRepo.find({
      order: {
        id: 'ASC',
      },
      take: count,
      skip: (page - 1) * count,
    });
    const countUser = users.length;

    let totalPage = Math.ceil(
      (await (await this.userRepo.find()).length) / count,
    );

    let nextPage = `localhost:3000/users?page=${page + 1}&count=${count}`;
    let prevPage = `localhost:3000/users?page=${page - 1}&count=${count}`;

    return {
      success: true,
      page: page,
      total_pages: totalPage,
      total_users: await this.getUserCount(),
      count: count,
      links: {
        next_url: `${nextPage}`,
        prev_url: `${prevPage}`,
      },
      users: users,
    };
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
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
    });

    const token = await this.tokenService.tokenGenerate();
    console.log(token);

    await this.userRepo.insert(userData);
    return userData;
  }

  async seedUsersSucess() {
    await this.positionService.createSeedPosition();
    const userArray: UserEntity[] = [];

    for (let i = 0; i < 45; i++) {
      const seedUser = await this.userRepo.create({
        email: faker.internet.email(),
        name: faker.name.fullName(),
        phone: '+380' + faker.phone.number(),
        registration_timestamp: Date.now(),
        position: {
          id: Math.ceil(Math.random() * 4),
        },
      });
      userArray.push(seedUser);
    }

    await this.userRepo.insert(userArray);

    let user = await this.userRepo.find({
      relations: {
        position: true,
      },
    });

    return {
      success: 'sucess',
      data: user,
    };
  }

  async getUserById(id: number): Promise<any> {
    id = Number(id);

    if (typeof id !== 'number') {
      return {
        success: false,
        message: 'Validation failed',
        fails: {
          user_id: ['The user_id must be an integer.'],
        },
      };
    }

    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      return {
        success: false,
        message: 'The user with the requested identifier does not exist',
        fails: {
          user_id: ['User not found'],
        },
      };
    }
    return { success: true, user: user };
  }

  async getUserCount(): Promise<number> {
    return await this.userRepo.count();
  }

  async filterUser(filter: FilterUserDto): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
}
