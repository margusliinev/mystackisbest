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
                return new BadRequestException({
                    statusCode: 400,
                    message: Object.values(validationErrors[0] || {})[0],
                    field: validationProperties[0] || null,
                });
            },
        })
    );
    await app.listen(process.env.PORT || 5000);
}
void bootstrap();
