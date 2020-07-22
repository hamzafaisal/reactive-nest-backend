import { Controller, Body, Post } from '@nestjs/common';
import { CreateSignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createSignupDto: CreateSignupDto): Promise<any> {
    return this.authService.signup(createSignupDto);
  }

  @Post('/login')
  login(@Body() createLoginDto: CreateLoginDto): Promise<any> {
    return this.authService.login(createLoginDto);
  }
}
