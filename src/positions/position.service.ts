import { faker } from '@faker-js/faker';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { PositionEntity } from './entity/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private positionRepo: Repository<PositionEntity>,
  ) {}

  async getPosition(): Promise<any> {
    const position = await this.positionRepo.find();

    if (!(typeof position !== 'undefined' && position.length > 0)) {
      throw new HttpException(
        'Cannot find any position',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      success: true,
      positions: position,
    };
  }

  async createSeedPosition(): Promise<PositionEntity[]> {
    for (let i = 0; i < 4; i++) {
      await this.positionRepo
        .createQueryBuilder()
        .insert()
        .into(PositionEntity)
        .values([{ name: faker.commerce.department() }])
        .execute();
    }
    return await this.positionRepo.find();
  }

  async createPos() {
    await this.positionRepo.insert({ name: 'position' });
  }
}
