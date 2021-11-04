import { Module } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { RentalController } from '../controller/rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiPipeModule } from 'nestjs-joi';
import { Rental } from 'src/model/rental.entity';
import { Endereco } from 'src/model/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Endereco]), JoiPipeModule],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
