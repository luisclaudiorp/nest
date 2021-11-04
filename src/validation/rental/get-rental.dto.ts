import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { CreateRentalDto } from './create-rental.dto';

export class GetRentalDto extends PartialType(CreateRentalDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().alphanum().optional())
  @IsString()
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  cnpj: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @IsString()
  atividades: string;

  @ApiProperty()
  @JoiSchema(Joi.array().optional())
  enderecos: [];
}
