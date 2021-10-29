import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { cpf } from 'cpf-cnpj-validator';
import * as moment from 'moment';

export type UserType = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    query: object,
  ): Promise<Pagination<User>> {
    this.clear(query);
    return paginate<User>(this.usersRepository, options, {
      where: query,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const obj = await this.findByCpf(createUserDto.cpf);
    if (typeof obj === 'undefined') {
      const userCpf = this.validateCpf(createUserDto.cpf);
      createUserDto.cpf = userCpf;
      this.validateDate(createUserDto.data_nascimento);
      const newUser = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(newUser);
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'CPF already em use',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  findAll(query?: object): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async findOneById(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(
        { email },
        { select: ['senha', 'email', 'id', 'habilitado'] },
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByCpf(cpf: string): Promise<User> {
    try {
      return await this.usersRepository.findOne({ cpf });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOneById(id);
      const newCpf = this.validateCpf(user.cpf);
      user.cpf = newCpf;
      this.usersRepository.merge(user, updateUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOneById(id);
      return await this.usersRepository.remove(user);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  clear(obj: object) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === obj['page'] || obj['limit']) delete obj[key];
    });
    return obj;
  }

  validateCpf(cpfUser: string): string {
    const valid = cpf.isValid(cpfUser);
    if (valid === true) {
      const cpfFormat = cpf.format(cpfUser);
      return cpfFormat;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'CPF not Valid',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  validateDate(dateUser: string): number {
    const formatData = moment(dateUser, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'age under 18 years',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return dataT;
  }
}
