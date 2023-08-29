import { Controller, Get, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthenticatedRequest } from '../app.types';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async findAll(@Req() req: AuthenticatedRequest) {
        const sub = req.user.sub;
        const { posts } = await this.postsService.findAll(sub);
        return { success: true, data: posts };
    }
}
