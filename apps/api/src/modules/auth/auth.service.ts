import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('AuthService');

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Dummy sign-in: looks up user by email.
   * TODO: Replace with real password hashing (bcrypt) and JWT generation.
   */
  async signIn(email: string, _password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn(`Sign-in attempt for unknown email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: Verify password hash
    // TODO: Generate real JWT token

    return {
      accessToken: 'placeholder-jwt-token',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
      },
    };
  }
}
