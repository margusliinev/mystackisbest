import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    private exclude(user: User, key: keyof User) {
        delete user[key];
        return user;
    }

    async findAll() {
        const users = await this.prisma.user.findMany();

        users.map((user) => {
            this.exclude(user, 'password');
        });

        return users;
    }

    async create(createUserDto: CreateUserDto) {
        const doesEmailExist = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });

        if (doesEmailExist) {
            throw new ConflictException({ status: 409, message: 'Email is already in use', type: 'email' });
        }

        const hash = await bcrypt.hash(createUserDto.password, 10);

        const newUser = await this.prisma.user.create({ data: { ...createUserDto, password: hash } });

        if (!newUser) {
            throw new InternalServerErrorException({ status: 500, message: 'Failed to create an user', type: 'server' });
        }

        this.exclude(newUser, 'password');

        return newUser;
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException({ status: 404, message: 'User not found', type: 'server' });
        }

        this.exclude(user, 'password');

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });

        if (!updatedUser) {
            throw new InternalServerErrorException({ status: 500, message: 'Failed to update an user', type: 'server' });
        }

        this.exclude(updatedUser, 'password');

        return updatedUser;
    }

    async delete(id: string) {
        const deletedUser = await this.prisma.user.delete({ where: { id } });

        if (!deletedUser) {
            throw new InternalServerErrorException({ status: 500, message: 'Failed to delete an user', type: 'server' });
        }

        return deletedUser;
    }
}
