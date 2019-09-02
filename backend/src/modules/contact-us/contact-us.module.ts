
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { ContactUs } from './contact-us.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUs]), forwardRef(() => LoginModule)],
  exports: [ContactUsService],
  providers: [ContactUsService],
  controllers: [ContactUsController],
})
export class ContactUsModule {}