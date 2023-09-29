import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { LocalAuthGuard } from './guards/local.auth-user.guard';
import { JwtAuthGuard } from './guards/jwt.auth-user.guard';

@Controller('auth-user')
export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authUserService.signIn(signInDto.Email);
  }


  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('payload')
  payload(@Req() request) {
    return request.user;
  }
}
