import { 
    IsString,
    Length,
    IsBoolean,
    IsNumber 
} from "class-validator";

export class UpdateEventDto {
    @IsString({message: "Title must be a string"})
    @Length(1, 255,{message: "Title must be between 1 and 255 characters"})
    title: string;
    @IsString({message: "Description must be a string"})
    description: string;
    @IsString({message: "Address must be a string"})
    location: string;
    @IsString({message: "Date must be a string"})
    startDate?: string;
    @IsString({message: "Date must be a string"})
    endDate?: string;
    @IsBoolean({message: "Date must be a boolean"})
    private: boolean;
    @IsNumber()
    capacity: number;
    @IsString()
    contributors: string;
}