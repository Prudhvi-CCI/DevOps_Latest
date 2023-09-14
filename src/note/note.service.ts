import { Injectable } from '@nestjs/common';
import { CreateNoteRequestDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(Note) 
    private readonly noteRespository: Repository<Note>,
  ){}

  create(createNoteDto: CreateNoteRequestDto) {
    return this.noteRespository.save(createNoteDto);
  }

  findAll(): Promise<Note[]> {
    return this.noteRespository.find();
  }

  findOne(id): Promise<Note> {
    console.log("Reached service...")
    return this.noteRespository.findOneBy({
      id
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    const updatedData = new UpdateNoteDto();

    updatedData.title = updateNoteDto?.title;
    updatedData.description = updateNoteDto?.description;
    updatedData.password = updateNoteDto?.password;
    updatedData.date = updateNoteDto?.date;

    console.log(updatedData);

    return this.noteRespository.update(id,updatedData);  
  }

  remove(id: number) {
    return this.noteRespository.delete(id);
  }
}
