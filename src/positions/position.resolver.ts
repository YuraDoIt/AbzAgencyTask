import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PositionService } from './position.service';

@Resolver()
export class PositionResolver {
  constructor(
    private readonly positionService: PositionService
  ) {}

  @Query(() => String)
  async getAll() {
   return 'yes';
  }

}
