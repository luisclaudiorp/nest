import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';

interface Login {
  email?: string;
  sub?: string;
  id?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPass: string): Promise<User> {
    const user = await this.usersService.findByEmail(userEmail);
    if (user && user.senha === userPass && user.habilitado === 'sim') {
      delete user.senha;
      return user;
    }
    return null;
  }

  async login(user: Login) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
