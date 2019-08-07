
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Login } from './login.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Login]), forwardRef(() => UserModule)],
  exports: [LoginService],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}