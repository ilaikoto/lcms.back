import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.usersService.createUser({ ...data, password: hashedPassword });
  }

  async login(data: LoginDto): Promise<{ accessToken: string }> {
    const dbUser = await this.usersService.findByEmail(data.email);
    if (!dbUser || !(await bcrypt.compare(data.password, dbUser.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: dbUser.id, role: dbUser.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
