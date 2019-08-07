
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => LoginModule)],
  exports: [CardService],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}