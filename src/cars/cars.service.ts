import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  create(CreateCarDto: CreateCarDto): Promise<Car> {
    const newCar = this.carsRepository.create(CreateCarDto);
    return this.carsRepository.save(newCar);
  }

  findAll(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  async findOneById(id: number): Promise<Car> {
    try {
      const car = await this.carsRepository.findOneOrFail(id);
      return car;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, UpdateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const car = await this.findOneById(id);
      this.carsRepository.merge(car, UpdateCarDto);
      const results = await this.carsRepository.save(car);
      return results;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Car> {
    try {
      const Car = await this.findOneById(id);
      const result = await this.carsRepository.remove(Car);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
