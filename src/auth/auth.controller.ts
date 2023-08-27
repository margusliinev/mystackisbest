import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const { user } = await this.authService.register(registerDto);
        return { success: true, data: user };
    }

    @Public()
    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { user, token } = await this.authService.login(loginDto);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
        });
        return { success: true, data: user };
    }

    @Public()
    @Post('logout')
    @HttpCode(200)
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('token');
        return { success: true };
    }
}
