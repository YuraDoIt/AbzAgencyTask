import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { UserCreateDTO } from "./dto/user-create.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private jwtService:JwtService) 
    { }

  async findAllUser() : Promise<UserEntity[]> {
    return await this.user.find()
  }

  async createUser(UserCreateDTO: UserCreateDTO): Promise<UserEntity> {
    const emailRegExp = new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);

    const phoneRegExp = new RegExp(/^[\+]{0,1}380([0-9]{9})$/);

    if(UserCreateDTO.name.length < 2 || UserCreateDTO.name.length > 60) {
      throw new GraphQLError('length of name shoult be > 2 and < 60')
    }

    if(!emailRegExp.test(UserCreateDTO.email)) {
      throw new GraphQLError('mail not match with real mail')
    }

    if(!phoneRegExp.test(UserCreateDTO.phone)){
      throw new GraphQLError('phone not match with correct phone(+380)')
    }

    if(UserCreateDTO.position_id < 1 && typeof UserCreateDTO.position_id != 'bigint') {
      throw new GraphQLError('position_is should be > 1')
    }

    let userData: UserEntity = await this.user.create({
      email: UserCreateDTO.email,
      name: UserCreateDTO.name,
      phone:  UserCreateDTO.phone,
      position_id: UserCreateDTO.position_id,
      registration_timestamp: (new Date().getTime() + Math.floor(Math.random() * 1000)),
    });

    const token = await this.tokenGenerate(userData);
    console.log(token);

    await this.user.insert(userData);
    return userData
  }

  async seedUsers(): Promise<UserEntity[]> {
    const userArray: UserEntity[] = [];

    for(let i=0; i<45; i++) {
      const seedUser = await this.user.create({
        email: faker.internet.email(),
        name: faker.fake.name,
        phone: faker.phone.number(),
        registration_timestamp: Date.now(),
      });
      userArray.push(seedUser)
    }

    return userArray
  }

  async tokenGenerate(user: UserEntity): Promise<string>{
    const payload = {
      ...user
    }

    return this.jwtService.signAsync(payload);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.user.findOneBy({id: id
    });
    if(!user) {
      throw new GraphQLError('User not registered yet, try again');
    } 
    return user;
  }
}