import { HttpException, HttpStatus } from '@nestjs/common';

export class AgeError extends HttpException {
  constructor(message = null) {
    super(
      `Age error${message ? ' ' + message : ''}`,
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
