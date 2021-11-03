import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthDto } from '../validation/auth/auth.dto';
import { AuthService } from '../service/auth.service';

import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('api/v1')
@ApiTags('Auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiUnauthorizedResponse()
  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
