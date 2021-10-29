import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import * as Joi from 'joi';
import { JoiSchema, UPDATE } from 'nestjs-joi';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @JoiSchema(Joi.string().alphanum().min(2).max(30))
  @JoiSchema([UPDATE], Joi.string().alphanum().min(2).max(30).optional())
  @IsString()
  nome: string;

  @ApiProperty()
  @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')))
  @JoiSchema([UPDATE], Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')))
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty()
  @JoiSchema(Joi.string().length(11))
  @JoiSchema([UPDATE], Joi.string().length(11))
  @IsString()
  cpf: string;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().required())
  @IsString()
  data_nascimento: string;

  @ApiProperty()
  @JoiSchema(
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    }),
  )
  @JoiSchema(
    [UPDATE],
    Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'br'] },
    }),
  )
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().valid('sim', 'nao'))
  @JoiSchema([UPDATE], Joi.string().valid('sim', 'nao'))
  @IsString()
  habilitado: string;
}
