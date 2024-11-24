import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    
    @Get()
    @UsePipes()
    getEvents(@Query() pagination: PaginationDTO) {
        return  this.eventService.getEvents(pagination);
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
      
        return  this.eventService.createEvent(body, file);  
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

    @Post('mark')
    @UsePipes()
    markEvent(@Query() data: {eventId: number, username: string}) {
        console.log(data);
        return this.eventService.markEvent(data.username, data.eventId);
    }
}
