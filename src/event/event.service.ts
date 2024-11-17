import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateEvent } from 'typeorm';
import { Event } from 'src/entity/event.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly propertyRepo: Repository<Event>) {}
    async getEvents() {
        return await this.propertyRepo.find();
    }

    async getEventById(id: number) {
        try {
            return await this.propertyRepo.findOne({
                where: {
                    id
                }
            });
        }catch(e) {
            return e.message;
        }
    }

    async updateEvent(id: number, event: UpdateEventDto) {
        try {
            await this.propertyRepo.update({id}, event);
            return {message: 'Event updated', status: 200, updateAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }


    async deleteEvent(id: number) {  
        try {
            await this.propertyRepo.delete({id});
            return {message: 'Event deleted', status: 200, deleteAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }


    async  createEvent(event: CreateEventDto) {
        try {
            const newEvent = this.propertyRepo.create(event);
            await this.propertyRepo.save(newEvent);
            return  {message: 'Event created', status: 200, createdAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }
}
