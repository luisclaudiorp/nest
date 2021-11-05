import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { Endereco } from '../../model/endereco.entity';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateRentalDto extends PartialType(CreateRentalDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().min(6).trim().optional())
  @IsString()
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(14).max(18).trim().optional())
  @IsString()
  cnpj: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  atividades: string;

  @ApiProperty()
  @JoiSchema(Joi.array().optional())
  enderecos: Endereco[];
}
