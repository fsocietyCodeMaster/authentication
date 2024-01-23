import { Controller, Post, Body, Param, Get,Res,ParseIntPipe,HttpException, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import {  RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDTo} from './dto/login-auth.dto';
import {I18n,I18nContext} from 'nestjs-i18n'
import {Request, Response} from 'express'
import { TokenType, User } from 'src/strategies/param/cutom.param';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// User Registration Endpoint.

@Post('/register')
Register(@Body() registerDto: RegisterAuthDto,@I18n() i18n:I18nContext) {
  const message = i18n.t('translation.Register')
  return this.authService.register(registerDto,message);
}

// User Log in Endpoint. 

@Post('/login')
Login(@Body () loginDto:LoginAuthDTo ){
  return this.authService.login(loginDto);
}

}
