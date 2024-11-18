import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bscryt from 'bcrypt';

@Entity()
export class User {

    @PrimaryColumn()
    userName: string;

   @Column()
    firstName: string;

   @Column()
    lastName: string;

    @Column()
    password: string;

    @Column()
    email: string;

    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bscryt.hash(this.password, 10);
    }
}
