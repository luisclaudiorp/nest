import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { BadRequestError } from '../errors/badRequestError';
import { getCep } from '../helper/cep';
import { clear } from '../helper/clear';
import { validateCnpj } from '../helper/validateCnpj';
import { Endereco } from '../model/endereco.entity';
import { Rental } from '../model/rental.entity';
import { IdAllDto } from '../validation/id-all.dto';
import { GetRentalDto } from '../validation/rental/get-rental.dto';
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
      relations: ['enderecos'],
    });
  }

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const userCnpj = validateCnpj(createRentalDto.cnpj);
    const obj = await this.findByCnpj(userCnpj);
    if (typeof obj === 'undefined') {
      validateCnpj(createRentalDto.cnpj);
      const { enderecos, ...data } = createRentalDto;
      const newRental = this.rentalsRepository.create(data);
      await this.rentalsRepository.save(newRental);
      const [cepNumber] = enderecos.map((a) => a.cep);
      const adrress = await getCep(cepNumber);
      createRentalDto.enderecos.forEach(async (a) => {
        const newAdress = new Endereco();
        Object.assign(newAdress, adrress, a);
        newAdress.rental = newRental;
        const newEndereco = this.enderecoRepository.create(newAdress);
        await this.enderecoRepository.save(newEndereco);
      });
      return await this.rentalsRepository.findOne(newRental.id);
    }
    throw new BadRequestError('CNPJ');
  }

  async findByCnpj(cnpj: string): Promise<Rental> {
    return await this.rentalsRepository.findOne({ cnpj });
  }

  async findOneById(id: IdAllDto): Promise<Rental> {
    return await this.rentalsRepository.findOneOrFail(id);
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
