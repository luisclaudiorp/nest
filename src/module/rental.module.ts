import { Module } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { RentalController } from '../controller/rental.controller';

@Module({
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
