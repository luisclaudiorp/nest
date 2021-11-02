import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { CarsModule } from './cars.module';
import { AppController } from '../controller/app.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CarsModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}