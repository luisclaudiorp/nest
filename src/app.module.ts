import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CarsModule],
})
export class AppModule {}
