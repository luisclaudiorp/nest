import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(message = null) {
    super(
      `already em use${message ? ' ' + message : ''}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
