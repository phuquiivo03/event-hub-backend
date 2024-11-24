import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateEvent } from 'typeorm';
import { Event } from 'src/entity/event.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { uploadImage } from 'src/util/uploadFile';
import { PaginationDTO } from './dto/pagination.dto';
import { UrlWithStringQuery } from 'url';
import { User } from 'src/user/entities/user.entity';
import { retry } from 'rxjs';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepo: Repository<Event>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }
    async getEvents(pagination: PaginationDTO) {
        return await this.eventRepo.find({
            skip: pagination.skip,
            take: pagination.take || parseInt(process.env.default_pagination_limit)
        });
    }

    async getEventById(id: number) {
        try {
            return await this.eventRepo.findOne({
                where: {
                    id
                }
            });
        }catch(e) {
            return e.message;
        }
    }

    async updateEvent(id: number, event_dto: UpdateEventDto) {
        // unwrap envent object and get the contributor string (ex: "#user1#user2#user3")
        const {contributors, ...eventWithoutContributors} = event_dto;
        //get list contributors username
        const contributorsArray = contributors.split("#");

        try {
            //get event
            let event  = await this.eventRepo.findOneBy({id});
            // get current contributors
            const contributors = event.contributors.map(contributor => contributor.userName); 
            contributors.forEach(async (user) => {
                // filter out the contributor that not exist in the event
                if(!contributorsArray.find(contributor => contributor === user)) {
                    //remove the removed  contributor from the event
                    await this.removeContributors(user, event);
                }
            })
            contributorsArray.forEach(async newContributor => {
                // filter out the contributor that already exist in the event
                if(!contributors.find(contributor => contributor === newContributor)) {
                    //add new contributor to the event
                    await this.removeContributors(newContributor, event);
                }
            })
            await this.eventRepo.update({id}, eventWithoutContributors);
            return {message: 'Event updated', status: 200, updateAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }


    async deleteEvent(id: number) {  
        try {
            await this.eventRepo.delete({id});
            return {message: 'Event deleted', status: 200, deleteAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }


    async  createEvent(event: CreateEventDto, file: Express.Multer.File) {
        const fileUrl = await uploadImage(file);
        const newEvent = {...event, image: fileUrl};
        const {contributors, ...eventWithoutContributors} = newEvent;
        console.log('fileUrl', fileUrl);
        try {
            const createEvent = this.eventRepo.create(eventWithoutContributors);
            createEvent.contributors = [];
            await  this.addContributors(contributors, createEvent.contributors);
            await this.eventRepo.save(createEvent);
            return  {message: 'Event created', status: 200, createdAt: new Date(), event: {...createEvent}};
        }catch(e) {
            return e.message;
        }
    }

    async addContributors(contributors: string, ls_contributor: User[]) {
        const contributorsArray = contributors.split('#');
         for(const contributor of contributorsArray) {
            const user = await this.userRepo.findOne({
                where: {
                    userName: contributor
                }
            });
            if(user) {
                ls_contributor.push(user);
            }
        }
    }

    async markEvent(username: string, eventId: number) {
        try {
            // get event
            const event = await this.eventRepo.findOne({
                where: {
                    id: eventId
                }
            })
            if(event) {
                // get user
                const  user = await this.userRepo.findOne({
                    where: {
                        userName: username
                        
                    },
                    relations: {
                        markedEvents: true
                    }
                })
                
                if(user) {
                    //push add event to the user events list
                    user.markedEvents.push(event);
                    await this.userRepo.save(user);
                    return { status: 200, timestamp: new Date().toISOString(), message: 'Event marked', event };
                }
            }
        }catch(e) {
            return e.message;
        }

    }

    async removeContributors(username: string, event: Event) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userName: username
                }
            });
            if(user) {
                const index = event.contributors.indexOf(user);
                if(index > -1) {
                    event.contributors.splice(index, 1);
                    return event;
                }
            }
        }catch(e) {
            return e.message;
        }
    }

    async addContributor(username: string, event: Event) {
        try {
            const user = await this.userRepo.findOne({
                where: {
                    userName: username
                }
            });
            if(user) {
                event.contributors.push(user);
                return event;
            }
        }catch(e) {
            return e.message;
        }
    }
}
