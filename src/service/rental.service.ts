import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { clear } from 'src/helper/clear';
import { Endereco } from 'src/model/endereco.entity';
import { Rental } from 'src/model/rental.entity';
import { IdAllDto } from 'src/validation/id-all.dto';
import { GetRentalDto } from 'src/validation/rental/get-rental.dto';
import { Repository } from 'typeorm';
import { CreateRentalDto } from '../validation/rental/create-rental.dto';
import { UpdateRentalDto } from '../validation/rental/update-rental.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalsRepository: Repository<Rental>,
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    query: GetRentalDto,
  ): Promise<Pagination<Rental>> {
    clear(query);
    return paginate<Rental>(this.rentalsRepository, options, {
      where: query,
      relations: ['endereco'],
    });
  }

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { enderecos, ...data } = createRentalDto;
    const newRental = this.rentalsRepository.create(data);
    await this.rentalsRepository.save(newRental);
    createRentalDto.enderecos.forEach(async (a) => {
      let endereco = new Endereco();
      endereco = a;
      endereco.rental = newRental;
      const newEndereco = this.enderecoRepository.create(endereco);
      await this.enderecoRepository.save(newEndereco);
    });
    return await this.rentalsRepository.findOne(newRental.id);
  }

  async findOneById(id: IdAllDto): Promise<Rental> {
    try {
      return await this.rentalsRepository.findOneOrFail(id);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: IdAllDto,
    updateRentalDto: UpdateRentalDto,
  ): Promise<Rental> {
    try {
      const rental = await this.findOneById(id);
      const { enderecos, ...data } = updateRentalDto;
      this.rentalsRepository.merge(rental, data);
      return await this.rentalsRepository.save(rental);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: IdAllDto): Promise<Rental> {
    try {
      const rental = await this.findOneById(id);
      return await this.rentalsRepository.remove(rental);
    } catch (error) {
      throw error;
    }
  }

  // async updatAcessorioByCar(
  //   idCar: IdAllDto,
  //   idAcessorio: IdAllDto,
  //   description: Acessorio,
  // ): Promise<boolean> {
  //   const car = await this.acessorioRepository.findOne({
  //     where: { id: idAcessorio, carId: idCar },
  //   });
  //   if (!car) {
  //     throw new NotFoundError('car or acessorie');
  //   }
  //   console.log(car);
  //   await this.acessorioRepository.update(idAcessorio, description);
  //   return true;
  // }
}
