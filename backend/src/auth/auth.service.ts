import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes, randomInt } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyTwoFactorDto } from './dto/verify-two-factor.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const token = randomBytes(32).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    console.log(`[MOCK EMAIL] verify link for ${user.email}: /auth/verify-email?token=${token}`);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isEmailVerified: user.isEmailVerified,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: { emailVerificationToken: dto.token },
    });

    if (
      !user ||
      !user.emailVerificationTokenExpiresAt ||
      user.emailVerificationTokenExpiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
      },
    });

    return { message: 'Email verified' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorCode: code,
        twoFactorCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    console.log(`[MOCK EMAIL] 2FA code for ${user.email}: ${code}`);

    return {
      message: 'Two-factor code sent by email',
      email: user.email,
    };
  }

  async verifyTwoFactor(dto: VerifyTwoFactorDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (
      !user ||
      !user.twoFactorCode ||
      !user.twoFactorCodeExpiresAt ||
      user.twoFactorCodeExpiresAt < new Date() ||
      user.twoFactorCode !== dto.code
    ) {
      throw new UnauthorizedException('Invalid or expired code');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { twoFactorCode: null, twoFactorCodeExpiresAt: null },
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
