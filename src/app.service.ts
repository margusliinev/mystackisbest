import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    testing(): string {
        return 'If you see this message then your backend and frontend are connected correctly!';
    }
}
