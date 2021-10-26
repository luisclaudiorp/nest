import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acessorio } from './entities/acessorios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Acessorio])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
