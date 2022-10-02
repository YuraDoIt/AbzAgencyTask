import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PositionEntity } from 'src/positions/entity/position.entity';
import { AppController } from 'src/app.controller';
import { PhotoModule } from 'src/photo/photo.module';
import { PositionModule } from 'src/positions/position.module';
import { TokenEntity } from 'src/token/entity/token.entity';
import { TokenModule } from 'src/token/token.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TokenModule,
    UserModule,
    PositionModule,
    PhotoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://yura:yurapass@postgres:5432/managment',
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true,
      // type: 'postgres',
      // host: 'localhost',
      // port: 5433,
      // username: 'postgres',
      // password: '12345',
      // database: 'managment',
      // autoLoadEntities: true,
      // synchronize: true,
      // migrationsRun: true,
      // logging: true,
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   playground: true,
    //   sortSchema: true,
    // }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
