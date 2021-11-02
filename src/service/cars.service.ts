import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../validation/cars/create-car.dto';
import { UpdateCarDto } from '../validation/cars/update-car.dto';
import { Car } from '../model/car.entity';
import { Acessorio } from '../model/acessorios.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { GetCarDto } from 'src/validation/cars/get-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    @InjectRepository(Acessorio)
    private acessorioRepository: Repository<Acessorio>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    query: GetCarDto,
  ): Promise<Pagination<Car>> {
    this.clear(query);
    return paginate<Car>(this.carsRepository, options, {
      where: query,
      relations: ['acessorios'],
    });
  }

  async create(CreateCarDto: CreateCarDto): Promise<Car> {
    const { acessorios, ...data } = CreateCarDto;
    const newCar = this.carsRepository.create(data);
    await this.carsRepository.save(newCar);
    CreateCarDto.acessorios.forEach(async (a) => {
      const acessorio = new Acessorio();
      acessorio.descricao = a.descricao;
      acessorio.car = newCar;
      const newAcessorio = this.acessorioRepository.create(acessorio);
      await this.acessorioRepository.save(newAcessorio);
    });
    return await this.carsRepository.findOne(newCar.id);
  }

  async findOneById(id: number): Promise<Car> {
    try {
      return await this.carsRepository.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, UpdateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const car = await this.findOneById(id);
      const { acessorios, ...data } = UpdateCarDto;
      this.carsRepository.merge(car, data);
      return await this.carsRepository.save(car);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<Car> {
    try {
      const Car = await this.findOneById(id);
      return await this.carsRepository.remove(Car);
    } catch (error) {
      throw error;
    }
  }

  clear(obj: object) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === obj['page'] || obj['limit']) delete obj[key];
    });
    return obj;
  }
}
