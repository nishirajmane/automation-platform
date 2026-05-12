import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/sign-in
   * Dummy sign-in endpoint — returns a placeholder token.
   */
  @Post('sign-in')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  /**
   * POST /auth/sign-up
   */
  @Post('sign-up')
  async signUp(@Body() body: { email: string; password: string; name: string }) {
    return this.authService.signUp(body.email, body.password, body.name);
  }
}
