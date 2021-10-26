import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsString()
  data_nascimento: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  habilitado: string;
}
