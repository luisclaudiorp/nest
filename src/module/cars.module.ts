import { Module } from '@nestjs/common';
import { CarsService } from '../service/cars.service';
import { CarsController } from '../controller/cars.controller';
import { Car } from '../model/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acessorio } from '../model/acessorios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Acessorio])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
