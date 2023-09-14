import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { Note } from './note/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.0.104',
      port: 5432,
      password: 'vagrant',
      username: 'postgres',
      entities: [Note],
      database: 'notes_database',
      synchronize: true,
      logging: true,
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // password: 'raj12345',
      // username: 'postgres',
      // entities: [Note],
      // database: 'Notes',
      // synchronize: true,
      // logging: true,
    }),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
