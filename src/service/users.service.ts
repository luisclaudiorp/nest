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

export type UserType = object;

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
    clear(query);
    return paginate<User>(this.usersRepository, options, {
      where: query,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const obj = await this.findByCpf(createUserDto.cpf);
    if (typeof obj === 'undefined') {
      const userCpf = validateCpf(createUserDto.cpf);
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

  findAll(query?: object): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneOrFail(
      { email },
      { select: ['senha', 'email', 'id', 'habilitado'] },
    );
  }

  async findByCpf(cpf: string): Promise<User> {
    return await this.usersRepository.findOne({ cpf });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    const newCpf = validateCpf(user.cpf);
    user.cpf = newCpf;
    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return await this.usersRepository.remove(user);
  }
}
