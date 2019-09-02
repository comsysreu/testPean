
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentService } from './departament.service';
import { DepartamentController } from './departament.controller';
import { Departament } from './departament.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Departament]), forwardRef(() => LoginModule)],
  exports: [DepartamentService],
  providers: [DepartamentService],
  controllers: [DepartamentController],
})
export class DepartamentModule { }