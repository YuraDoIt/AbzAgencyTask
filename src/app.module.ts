import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { PositionEntity } from 'src/positions/entity/position.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      dropSchema: true,
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '12345',
      database: 'managment',
      entities: [UserEntity, PositionEntity],
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
