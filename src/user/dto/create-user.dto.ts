import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {

    @IsString()
    @Length(4, 32)
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
