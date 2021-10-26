import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto } from './auth/dto/auth.dto';
import { AuthService } from './auth/shared/auth.service';
import { JwtAuthGuard } from './auth/shared/jwt-auth.guard';
import { LocalAuthGuard } from './auth/shared/local-auth.guard';

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

  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
