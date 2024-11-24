import { UploadedFile } from "@nestjs/common";
import { isString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    location: string;
    @Column()
    startDate: string;
    @Column()
    endDate: string;
    @Column()
    private: boolean;
    @Column()
    capacity: number;

    @ManyToOne(() => User, user => user.userName)
    owner: User;

    @ManyToMany(() => User, user => user.contributedEvents)
    contributors: User[];

    @ManyToMany(() => User, user => user.markedEvents)
    markedUsers: User[];
}