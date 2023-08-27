import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from '../app.types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async findCurrentUser(@Req() req: AuthenticatedRequest) {
        const sub = req.user.sub;
        const { user } = await this.usersService.findCurrentUser(sub);
        return { success: true, data: user };
    }
}
