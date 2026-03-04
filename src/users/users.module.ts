import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
// eslint-disable-next-line prettier/prettier
export class UsersModule { }
