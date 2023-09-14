import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

describe('NoteController', () => {
  let noteController: NoteController;
  let noteService: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteService,
        {
          provide: getRepositoryToken(Note),
          useClass: Repository, // Use a mock Repository for testing
        },
      ],
    }).compile();

    noteController = module.get<NoteController>(NoteController);
    noteService = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(noteController).toBeDefined();
  });
});