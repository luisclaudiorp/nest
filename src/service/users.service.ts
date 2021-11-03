import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../validation/users/create-user.dto';
import { UpdateUserDto } from '../validation/users/update-user.dto';
import { User } from '../model/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { validateCpf } from 'helper/validateCpf';
import { validateDate } from 'helper/validadeDate';
import { clear } from 'helper/clear';
import { GetUserDto } from 'src/validation/users/get-user.dto';
import { IdAllDto } from 'src/validation/id-all.dto';

export type UserType = object;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    query: GetUserDto,
  ): Promise<Pagination<User>> {
    clear(query);
    return paginate<User>(this.usersRepository, options, {
      where: query,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCpf = validateCpf(createUserDto.cpf);
    const obj = await this.findByCpf(userCpf);
    if (typeof obj === 'undefined') {
      const userCpf = validateCpf(createUserDto.cpf);
      if (!this.findByEmail(createUserDto.email)) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Email already em use',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      createUserDto.cpf = userCpf;
      validateDate(createUserDto.data_nascimento);
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

  async findOneById(id: IdAllDto): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne(
      { email },
      { select: ['senha', 'email', 'id', 'habilitado'] },
    );
  }

  async findByCpf(cpf: string): Promise<User> {
    return await this.usersRepository.findOne({ cpf });
  }

  async update(id: IdAllDto, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    const newCpf = validateCpf(user.cpf);
    user.cpf = newCpf;
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: IdAllDto): Promise<User> {
    const user = await this.findOneById(id);
    return await this.usersRepository.remove(user);
  }
}
