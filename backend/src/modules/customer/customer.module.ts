
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => LoginModule)],
  exports: [CustomerService],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule { }