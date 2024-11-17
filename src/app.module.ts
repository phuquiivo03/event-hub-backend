import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import dbConfig from './config/db.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig
    }),
    EventModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'), // Path to your upload folder
    //   serveRoot: '/uploads', // Serve files under this route
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
