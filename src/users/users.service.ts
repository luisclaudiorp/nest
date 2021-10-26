import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export type UserType = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(query?: object): Promise<User[]> {
    return this.usersRepository.find(query);
  }

  async findOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ email });
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOneById(id);
      this.usersRepository.merge(user, updateUserDto);
      const results = await this.usersRepository.save(user);
      return results;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOneById(id);
      const result = await this.usersRepository.remove(user);
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
