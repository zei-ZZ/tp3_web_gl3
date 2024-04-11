import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, UserEntity } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
    super(usersRepository);
  }

  private readonly saltRounds = 10;

  private async hashPassword(password?: string): Promise<[string?, string?]> {
    if (password == undefined) {
      return [undefined, undefined];
    }

    const salt = await genSalt(this.saltRounds);
    const passwordHash = await hash(password, salt);

    return [passwordHash, salt];
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username, email, password, role } = registerUserDto;

    const [passwordHash, salt] = await this.hashPassword(password);

    const user: DeepPartial<UserEntity> = {
      username,
      email,
      password: passwordHash,
      salt,
      role: role ? role : Role.Client,
    };

    return super.create(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthDto> {
    const { email, password } = loginUserDto;

    const user = await this.repository.findOneBy({ email });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { username, email, password, role } = updateUserDto;

    const [passwordHash, salt] = await this.hashPassword(password);

    const user: DeepPartial<UserEntity> = {
      username,
      email,
      password: passwordHash,
      salt,
      role,
    };

    return super.update(id, user);
  }
}
