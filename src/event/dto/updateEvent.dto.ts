import { IsString } from "class-validator";

export class UpdateEventDto {
    @IsString({message:"Title must be a string"})
    title: string;
    @IsString({message:"Description must be a string"})
    description: string;
    @IsString({message:"Image must be a string"})
    image: string;
    @IsString({message:"Address must be a string"})
    address: string;
    @IsString({message:"Date must be a string"})
    date: string
}