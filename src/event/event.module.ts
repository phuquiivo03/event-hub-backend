import { Module, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  imports: [TypeOrmModule.forFeature([Event]),
  // MulterModule.register({
  //   storage: diskStorage({
  //     destination: './uploads', // Folder to store files
  //     filename: (req, file, callback) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       const ext = extname(file.originalname);
  //       callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //     },
  //   }),
  // }),
],
  providers: [EventService, {
    provide: 'APP_PIPE',
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  }],
  controllers: [EventController]
})
export class EventModule {}
