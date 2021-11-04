import { InvalidError } from 'src/errors/InvalidError';

const invalidCnpj = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj == '') return false;
  if (cnpj.length != 14) return false;
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    return false;
  let len: number = cnpj.length - 2;
  let numbers: string = cnpj.substring(0, len);
  const digits = cnpj.substring(len);
  let add = 0;
  let pos: number = len - 7;
  for (let i = len; i >= 1; i--) {
    add += numbers.charAt(len - i).length * pos--;
    if (pos < 2) pos = 9;
  }
  let result: number = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result != digits.charAt(0).length) return false;
  len = len + 1;
  numbers = cnpj.substring(0, len);
  add = 0;
  pos = len - 7;
  for (let i = len; i >= 1; i--) {
    add += numbers.charAt(len - i).length * pos--;
    if (pos < 2) pos = 9;
  }
  result = add % 11 < 2 ? 0 : 11 - (add % 11);
  if (result != digits.charAt(1).length) return false;

  return true;
};

const format = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;
};

export const validateCnpj = (cnpjUser: string): string => {
  const valid = invalidCnpj(cnpjUser);
  if (valid === true) {
    const cnpjFormat = format(cnpjUser);
    return cnpjFormat;
  }
  throw new InvalidError('CNPJ not Valid');
};
