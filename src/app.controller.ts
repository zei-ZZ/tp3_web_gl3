import { Controller, Get, Res, Sse, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/user.decorator';
import { UserEntity } from './auth/entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AdminGuard } from './auth/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get('/admin')
  @UseGuards(AdminGuard)
  getAdmin(@User() user: UserEntity): UserEntity {
    return user;
  }
}
