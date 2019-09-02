import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { StoreModule } from './modules/store/store.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CardModule } from './modules/card/card.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DepartamentModule } from './modules/departament/departament.module';
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '181.209.138.62',
      // host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'db_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    LoginModule,
    StoreModule,
    CustomerModule,
    CardModule,
    TransactionModule,
    ContactUsModule,
    ProfileModule, 
    DepartamentModule, 
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
