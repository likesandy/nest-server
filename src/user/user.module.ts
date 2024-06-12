import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  // controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
