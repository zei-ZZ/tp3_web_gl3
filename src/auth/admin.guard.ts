import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './entities/user.entity';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = await super.canActivate(context);

    const {
      user: { role },
    } = context.switchToHttp().getRequest();

    return parentCanActivate && role === Role.Admin;
  }
}
