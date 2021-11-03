import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Acessorio } from 'src/model/acessories.entity';
import { UpdateAcessorieDto } from 'src/validation/acessories/update-acessories.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AcessorieService {
  constructor(
    @InjectRepository(Acessorio)
    private acessorieRepository: Repository<Acessorio>,
  ) {}

  async findOneById(id: number): Promise<Acessorio> {
    return await this.acessorieRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateAcessorieDto: UpdateAcessorieDto,
  ): Promise<Acessorio> {
    const user = await this.findOneById(id);
    this.acessorieRepository.merge(user, updateAcessorieDto);
    return await this.acessorieRepository.save(user);
  }
}
