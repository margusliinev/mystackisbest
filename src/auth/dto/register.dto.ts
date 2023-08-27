import { IsEmail, IsNotEmpty, IsString, Length, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @Matches(/^[a-zA-Z0-9-]+$/, { message: 'Username can only contain letters, numbers, and hyphens' })
    @Matches(/^[a-zA-Z0-9]/, { message: 'Username must start with a letter or number' })
    @Matches(/^[^-].*[^-]$/, { message: 'Username cannot start or end with a hyphen.' })
    @IsString({ message: 'Invalid value' })
    @Length(4, 39, { message: 'Username must be between 4 and 39 characters' })
    @IsNotEmpty({ message: 'Username is required.' })
    username: string;

    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @Matches(/.*[A-Za-z].*/, { message: 'Password must contain at least one letter' })
    @Matches(/.*\d.*/, { message: 'Password must contain at least one number' })
    @IsString({ message: 'Invalid value' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
