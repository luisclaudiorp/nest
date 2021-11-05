import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../validation/cars/create-car.dto';
import { UpdateCarDto } from '../validation/cars/update-car.dto';
import { Car } from '../model/car.entity';
import { Acessorio } from '../model/acessories.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { GetCarDto } from '../validation/cars/get-car.dto';
import { IdAllDto } from '../validation/id-all.dto';
import { clear } from '../helper/clear';
import { NotFoundError } from '../errors/notFoundError';

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
    clear(query);
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
      console.log(acessorio);
      const newAcessorio = this.acessorioRepository.create(acessorio);
      await this.acessorioRepository.save(newAcessorio);
    });
    return await this.carsRepository.findOne(newCar.id);
  }

  async findOneById(id: IdAllDto): Promise<Car> {
    try {
      return await this.carsRepository.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: IdAllDto, UpdateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const car = await this.findOneById(id);
      const { acessorios, ...data } = UpdateCarDto;
      this.carsRepository.merge(car, data);
      return await this.carsRepository.save(car);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: IdAllDto): Promise<Car> {
    try {
      const Car = await this.findOneById(id);
      return await this.carsRepository.remove(Car);
    } catch (error) {
      throw error;
    }
  }

  async updatAcessorioByCar(
    idCar: IdAllDto,
    idAcessorio: IdAllDto,
    description: Acessorio,
  ): Promise<boolean> {
    const car = await this.acessorioRepository.findOne({
      where: { id: idAcessorio, carId: idCar },
    });
    if (!car) {
      throw new NotFoundError('car or acessorie');
    }
    console.log(car);
    await this.acessorioRepository.update(idAcessorio, description);
    return true;
  }
}
