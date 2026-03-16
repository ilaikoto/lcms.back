import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from '../../../generated/prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should contains at least 8 characters' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name should not be empty' })
  fullName: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
