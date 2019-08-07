
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => LoginModule)],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}