import { UploadedFile } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    image: File;
    @Column()
    address: string;
    @Column()
    date: string;
}