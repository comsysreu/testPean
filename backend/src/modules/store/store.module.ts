
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './store.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), forwardRef(() => LoginModule)],
  exports: [StoreService],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule { }