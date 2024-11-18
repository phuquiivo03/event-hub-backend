import { UploadedFile } from "@nestjs/common";
import { isString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    image: string;
    @Column()
    address: string;
    @Column()
    startDate: string;
    @Column()
    endDate: string;
}