import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import * as Joi from 'joi';
import { JoiSchema, UPDATE } from 'nestjs-joi';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().trim().alphanum().min(2).max(30))
  @JoiSchema([UPDATE], Joi.string().trim().alphanum().min(2).max(30).optional())
  @IsString()
  @MinLength(3)
  @IsOptional()
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional())
  @JoiSchema(
    [UPDATE],
    Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
  )
  @IsString()
  @MinLength(6)
  @IsOptional()
  senha: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().length(14).optional())
  @JoiSchema([UPDATE], Joi.string().trim().length(14).optional())
  @IsString()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().optional())
  @JoiSchema([UPDATE], Joi.string().trim().optional())
  @IsString()
  @IsOptional()
  data_nascimento: string;

  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .optional(),
  )
  @JoiSchema(
    [UPDATE],
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .optional(),
  )
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().trim().valid('sim', 'nao').optional())
  @JoiSchema([UPDATE], Joi.string().trim().valid('sim', 'nao').optional())
  @IsString()
  @IsOptional()
  habilitado: string;
}
