
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), forwardRef(() => LoginModule)],
  exports: [ProfileService],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule { }