import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { Endereco } from '../../model/endereco.entity';

export class CreateRentalDto {
  @ApiProperty()
  @JoiSchema(Joi.string().min(6).trim().trim().required())
  @IsString()
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().min(14).max(18).trim().required())
  @IsString()
  cnpj: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  atividades: string;

  @ApiProperty()
  @JoiSchema(Joi.array().required())
  enderecos: Endereco[];
}
