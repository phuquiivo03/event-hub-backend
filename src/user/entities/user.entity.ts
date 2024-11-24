import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import * as bscryt from 'bcrypt';
import { Event } from "src/entity/event.entity";

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
    
    @OneToMany(() => Event, event => event.owner)
    events: Event[];

    @ManyToMany(() => Event, event => event.contributors)
    @JoinTable({name: 'contributed_events'})
    contributedEvents: Event[];


    @ManyToMany(() => Event, event => event.markedUsers)
    @JoinTable({name: 'marked_events'})
    markedEvents: Event[];
}
