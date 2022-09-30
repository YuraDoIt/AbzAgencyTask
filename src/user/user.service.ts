import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../photo/cloudinary.service';
import { PositionEntity } from '../positions/entity/position.entity';
import { PositionService } from '../positions/position.service';
import { TokenService } from './../token/token.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserResponse } from './dto/user.response';
import { UserEntity } from './entities/user.entity';

type failsType = {
  name?: object;
  phone?: object;
  email?: object;
  position_id?: object;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(PositionEntity)
    private positionRepo: Repository<PositionEntity>,
    private tokenService: TokenService,
    private positionService: PositionService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAllUser(query: any): Promise<UserResponse> {
    let { count, page, offset } = query;
    console.log(query.page);
    if (!page) {
      page = 1;
    }
    if (!count) {
      count = 10;
    }
    if (!offset) {
      offset = 5;
    }

    page = Number(page);
    count = Number(count);

    if (page < 0 || count < 0 || offset < 0) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: {
            success: false,
            message: 'Validation failed',
            fails: {
              count: ['The count must be an integer.'],
              page: ['The page must be at least 1.'],
            },
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
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

    return {
      success: true,
      page: page,
      total_pages: totalPage,
      total_users: await this.getUserCount(),
      count: count,
      links: {
        next_url:
          Number(page) + 1 > totalPage
            ? null
            : `http://localhost:3000/table?page=${page + 1}&count=${count}`,
        prev_url:
          Number(page) - 1 < 1
            ? null
            : `http://localhost:3000/table?page=${Number(
                page - 1,
              )}&count=${count}`,
      },
      users: users,
    };
  }

  async createUser(file, UserCreateDTO: UserCreateDTO): Promise<any> {
    let fails: failsType = {};

    if (
      (await this.userRepo.findOne({
        where: { email: UserCreateDTO.email },
      })) ||
      (await this.userRepo.findOne({
        where: { phone: UserCreateDTO.phone },
      }))
    ) {
      Object.assign(fails, {
        email: ['mail not match with real mail'],
      });
      throw new HttpException(
        {
          success: false,
          message: 'User with this phone or email already exist',
        },
        HttpStatus.CONFLICT,
      );
    }

    const emailRegExp = new RegExp(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    );

    const phoneRegExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);

    if (UserCreateDTO.name.length < 2 || UserCreateDTO.name.length > 60) {
      Object.assign(fails, {
        name: ['The name must be at least 2 characters.'],
      });
    }

    if (!emailRegExp.test(UserCreateDTO.email)) {
      Object.assign(fails, {
        email: ['mail not match with real mail'],
      });
    }

    if (!phoneRegExp.test(UserCreateDTO.phone)) {
      Object.assign(fails, {
        phone: ['phone not match with correct phone(+380)'],
      });
    }

    if (
      UserCreateDTO.position_id < 1 &&
      typeof UserCreateDTO.position_id != 'bigint'
    ) {
      Object.assign(fails, {
        position_id: ['The position id must be an integer.'],
      });
    }

    if (fails.name || fails.email || fails.position_id || fails.phone) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Validation failed',
          fails: fails,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let fileUpload = await this.cloudinaryService.uploadImage(file);
    if (fileUpload.bytes < 5000000) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'File cannot be more 5mb',
          fails: fails,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let userData: UserEntity = await this.userRepo.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone: UserCreateDTO.phone,
      registration_timestamp:
        new Date().getTime() + Math.floor(Math.random() * 1000),
      photo: fileUpload.url,
    });

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
        phone: '+380' + (await this.phoneGenerator()),
        registration_timestamp: Date.now(),
        photo: faker.image.avatar(),
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

  async phoneGenerator(): Promise<number> {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(Math.ceil(Math.random() * 10));
    }
    return Number(arr.join(''));
  }
}
