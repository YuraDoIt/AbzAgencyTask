import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { PositionEntity } from "./entity/position.entity";

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity) private position: Repository<PositionEntity>,) 
    { }
}