/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { RentalController } from './rental.controller';

describe('RentalController', () => {
  let rentalController: RentalController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [], // Add
    }).compile();

    rentalController = moduleRef.get<RentalController>(RentalController);
  });

  it('should be defined', () => {
    expect(rentalController).toBeDefined();
  });
});
