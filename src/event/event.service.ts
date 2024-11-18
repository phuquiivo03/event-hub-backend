import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateEvent } from 'typeorm';
import { Event } from 'src/entity/event.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { uploadImage } from 'src/util/uploadFile';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly propertyRepo: Repository<Event>) {}
    async getEvents(pagination: PaginationDTO) {
        return await this.propertyRepo.find({
            skip: pagination.skip,
            take: pagination.take || parseInt(process.env.default_pagination_limit)
        });
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


    async  createEvent(event: CreateEventDto, file: Express.Multer.File) {
        const fileUrl = await uploadImage(file);
        const newEvent = {...event, image: fileUrl};
        console.log('fileUrl', fileUrl);
        try {
            const createEvent = this.propertyRepo.create(newEvent);
            await this.propertyRepo.save(createEvent);
            return  {message: 'Event created', status: 200, createdAt: new Date()};
        }catch(e) {
            return e.message;
        }
    }
}
