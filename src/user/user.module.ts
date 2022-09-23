import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [UserResolver]
})
export class UserModule {}