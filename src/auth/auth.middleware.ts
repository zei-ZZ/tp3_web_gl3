import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthService } from './auth.service';

enum AuthHeader {
  Real = 'authorization',
  Mock = 'auth-user',
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  private getAccessToken(req: Request): string {
    const headerName: AuthHeader = AuthHeader.Mock;
    const authorizationHeader = req.headers[headerName] as string;

    const [type, token] = (authorizationHeader ?? '').split(' ', 2);

    return type === 'Bearer' ? token : null;
  }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.getAccessToken(req);
      const payload = verify(token, process.env.JWT_SECRET);

      const id = payload.sub as string;
      req.user = this.authService.findOne(id);

      next();
    } catch (_error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}
