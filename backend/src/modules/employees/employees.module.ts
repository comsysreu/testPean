
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employees } from './employees.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employees]), forwardRef(() => LoginModule)],
  exports: [EmployeesService],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}