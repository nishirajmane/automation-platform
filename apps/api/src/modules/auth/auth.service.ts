import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../../prisma/prisma.service';
import { createLogger } from '@app/shared-utils';

const logger = createLogger('AuthService');

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Dummy sign-in: looks up user by email.
   * TODO: Replace with real password hashing (bcrypt) and JWT generation.
   */
  async signIn(email: string, _password: string) {
    const res = await this.db.query('SELECT * FROM "User" WHERE email = $1', [email]);
    const user = res.rows[0];

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

  /**
   * Dummy sign-up: creates a user.
   */
  async signUp(email: string, passwordHash: string, name: string) {
    // Check if user already exists
    const existing = await this.db.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const res = await this.db.query(
      'INSERT INTO "User" (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, name]
    );
    const user = res.rows[0];

    logger.info(`New user signed up: ${email}`);

    return {
      accessToken: 'placeholder-jwt-token',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
