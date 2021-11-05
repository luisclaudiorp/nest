/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { CarsController } from './cars.controller';

describe('CarsController', () => {
  let carsController: CarsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [], // Add
    }).compile();

    carsController = moduleRef.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
  });
});
