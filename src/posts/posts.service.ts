import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
    async findAll(sub: string) {
        const posts = await this.prisma.post.findMany({ where: { authorId: sub } });

        return { posts };
    }
}
