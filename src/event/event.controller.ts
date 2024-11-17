import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    
    @Get()
    @UsePipes()
    getEvents() {
        return  this.eventService.getEvents();
    }

    @Get(':id')
    @UsePipes()
    getEvent(@Param('id') id: number) {
        return this.eventService.getEventById(id);
    }

    @Post()
    @UsePipes()
    @UseInterceptors(FileInterceptor('image', {}))
    createEvent(@Body() body: CreateEventDto, @UploadedFile() file: Express.Multer.File) {
        console.log('file bufer:', file);
        return  this.eventService.createEvent(body);  
    }

    @Patch(':id')
    @UsePipes()
    updaeEvent(@Param('id') id: number, @Body() body: UpdateEventDto) {
        return this.eventService.updateEvent(id, body);
    }

    @Delete(':id')
    @UsePipes()
    deleteEvent(@Param('id') id: number) {
        return this.eventService.deleteEvent(id);
    }

}
