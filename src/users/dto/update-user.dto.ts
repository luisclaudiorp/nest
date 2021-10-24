import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nome: string;
  senha: string;
  cpf: string;
  data_nascimento: string;
  email: string;
  habilitado: string;
}
