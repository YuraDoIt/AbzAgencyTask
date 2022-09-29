import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PositionEntity } from 'src/positions/entity/position.entity';
import { AppController } from './app.controller';
import { PhotoModule } from './photo/photo.module';
import { PositionModule } from './positions/position.module';
import { TokenEntity } from './token/entity/token.entity';
import { TokenModule } from './token/token.module';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TokenModule,
    UserModule,
    PositionModule,
    PhotoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      dropSchema: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '12345',
      database: 'managment',
      entities: [UserEntity, PositionEntity, TokenEntity],
      synchronize: true,
      migrationsRun: true,
      logging: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
