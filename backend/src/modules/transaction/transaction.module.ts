
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { LoginModule } from '../login/login.module';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), forwardRef(() => LoginModule), forwardRef(() => CardModule)],
  exports: [TransactionService],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}