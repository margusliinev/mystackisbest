import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest, JwtPayload } from '../app.types';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }

        const request: AuthenticatedRequest = context.switchToHttp().getRequest();
        const token = request.cookies.token;

        if (!token) {
            throw new UnauthorizedException({ statusCode: 401, message: 'Unauthenticated request', field: null });
        }

        try {
            const token = request.cookies.token;
            const { sub } = this.jwtService.verify<JwtPayload>(token, { secret: process.env.JWT_SECRET });
            request.user = { sub };
        } catch (error) {
            throw new UnauthorizedException({ statusCode: 401, message: 'Unauthenticated request', field: null });
        }
        return true;
    }
}
