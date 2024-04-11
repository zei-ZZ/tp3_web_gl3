import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './auth/user.decorator';
import { UserEntity } from './auth/entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@User() user?: UserEntity): string {
    console.log(user);

    return this.appService.getHello();
  }
}
