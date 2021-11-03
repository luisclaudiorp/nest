import { Module } from '@nestjs/common';
import { CarsService } from '../service/cars.service';
import { CarsController } from '../controller/cars.controller';
import { Car } from '../model/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acessorio } from '../model/acessories.entity';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Acessorio]), JoiPipeModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
