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
      ssl: {
        rejectUnauthorized: false,
      },
      dropSchema: true,
      type: 'postgres',
      host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
      port: 5432,
      username: 'byfxlqafalwhwx',
      password:
        'abfcda04fff7c392b8eb9ad62a0495fae406376e9db0de730df88ae54a47d434',
      database: 'd3hvgv76g3ui4s',
      url: 'postgres://byfxlqafalwhwx:abfcda04fff7c392b8eb9ad62a0495fae406376e9db0de730df88ae54a47d434@ec2-44-208-88-195.compute-1.amazonaws.com:5432/d3hvgv76g3ui4s',
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      logging: true,
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
