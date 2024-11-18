import { IsNumber, IsOptional } from "class-validator";

export class PaginationDTO {

    @IsOptional()
    @IsNumber()
    skip: number;

    @IsOptional()
    @IsNumber()
    take: number;
}