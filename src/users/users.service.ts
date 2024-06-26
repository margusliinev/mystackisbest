import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async findCurrentUser(sub: string) {
        const user = await this.prisma.user.findUnique({ where: { id: sub } });

        if (!user) {
            throw new NotFoundException({ statusCode: 404, message: 'User not found', field: null });
        }

        this.exclude(user, 'password');

        return { user };
    }
}
