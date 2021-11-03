import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(message = null) {
    super(`not found${message ? ' ' + message : ''}`, HttpStatus.NOT_FOUND);
  }
}
