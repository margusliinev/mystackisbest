import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory(errors) {
                const validationErrors = errors.map((error) => error.constraints);
                const validationProperties = errors.map((error) => error.property);
                console.log(validationErrors);
                return new BadRequestException({
                    status: 400,
                    message: Object.values(validationErrors[0] || {})[0],
                    type: validationProperties[0] || 'server',
                });
            },
        })
    );
    await app.listen(process.env.PORT || 5000);
}
void bootstrap();
