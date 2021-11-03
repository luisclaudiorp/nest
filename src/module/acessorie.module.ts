import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acessorio } from 'src/model/acessories.entity';
import { AcessorieController } from 'src/controller/acessorie.controller';
import { AcessorieService } from 'src/service/acessories.service';
import { JoiPipeModule } from 'nestjs-joi';
import { Car } from 'src/model/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acessorio, Car]), JoiPipeModule],
  controllers: [AcessorieController],
  providers: [AcessorieService],
  exports: [AcessorieService],
})
export class AcessorieModule {}
