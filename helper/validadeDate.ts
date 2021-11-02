import { HttpException, HttpStatus } from '@nestjs/common';
import moment from 'moment';

export const validateDate = (dateUser: string): number => {
  const formatData = moment(dateUser, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const dataT = moment().diff(formatData, 'years');
  if (dataT < 18) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'age under 18 years',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return dataT;
};
