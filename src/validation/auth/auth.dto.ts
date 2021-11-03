import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class AuthDto {
  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
      })
      .required(),
  )
  @IsString()
  email: string;

  @ApiProperty()
  @JoiSchema(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required())
  @IsString()
  senha: string;
}
