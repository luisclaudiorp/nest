import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/shared/auth.service';
import { JwtAuthGuard } from './auth/shared/jwt-auth.guard';
import { LocalAuthGuard } from './auth/shared/local-auth.guard';

@Controller('api/v1')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
