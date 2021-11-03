import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acessorio } from 'src/model/acessories.entity';
import { Car } from 'src/model/car.entity';
import { UpdateAcessorieDto } from 'src/validation/acessories/update-acessories.dto';
import { IdAllDto } from 'src/validation/id-all.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AcessorieService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    @InjectRepository(Acessorio)
    private acessorieRepository: Repository<Acessorio>,
  ) {}

  async find(id: object): Promise<Acessorio[]> {
    console.log(id);
    const car = await this.carsRepository.findOneOrFail(id);
    console.log(car);
    return await this.acessorieRepository.find();
  }

  async findOneById(id: IdAllDto): Promise<Acessorio> {
    return await this.acessorieRepository.findOneOrFail(id);
  }

  async update(
    id: IdAllDto,
    updateAcessorieDto: UpdateAcessorieDto,
  ): Promise<Acessorio> {
    const user = await this.findOneById(id);
    this.acessorieRepository.merge(user, updateAcessorieDto);
    return await this.acessorieRepository.save(user);
  }
}
