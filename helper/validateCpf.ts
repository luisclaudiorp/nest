import { HttpException, HttpStatus } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';

export const validateCpf = (cpfUser: string): string => {
  const valid = cpf.isValid(cpfUser);
  if (valid === true) {
    const cpfFormat = cpf.format(cpfUser);
    return cpfFormat;
  }
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: 'CPF not Valid',
    },
    HttpStatus.BAD_REQUEST,
  );
};
