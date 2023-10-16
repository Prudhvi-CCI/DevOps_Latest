import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { CreateNoteRequestDto } from './dto/create-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('NoteController (Functional Test)', () => {
  let noteController: NoteController;
  let noteService: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteService,
        {
          provide: getRepositoryToken(Note),
          useClass: Repository,
        },
      ],
    }).compile();

    noteController = module.get<NoteController>(NoteController);
    noteService = module.get<NoteService>(NoteService);
  });

  it('should create a new note', async () => {
    const createNoteDto: CreateNoteRequestDto = {
      title: 'Vagrant',
      description: 'Vagrant provides awesome boxes',
      password: '',
      date: ''
    };

    // Mock the create method of the NoteService
    jest.spyOn(noteService, 'create').mockImplementation(async (createNoteDto: CreateNoteRequestDto) => {
      // Return a custom response or perform any logic you want for testing
      return { 
        id: '7980867',
        title: 'Vagrant',
        description: 'Vagrant provides awesome boxes',
        password: '8990',
        date: ''
      };
    });

    const result = await noteController.create(createNoteDto);

    // Assert the result based on your custom response
    expect(result).toEqual({ /* Your custom response object */ });
  });
});



// import { Test, TestingModule } from '@nestjs/testing';
// import { NoteService } from './note.service';
// import { NoteController } from './note.controller';
// import { CreateNoteRequestDto } from './dto/create-note.dto';
// import { UpdateNoteDto } from './dto/update-note.dto';
// import { Note } from './entities/note.entity';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import * as request from 'supertest';

// describe('NoteController', () => {
//   let app;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [NoteController],
//       providers: [
//         NoteService,
//         {
//           provide: getRepositoryToken(Note),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     app = module.createNestApplication();
//     await app.init();
//   });

//   it('/note', async () => {
//     const createNoteDto: CreateNoteRequestDto = {
      // title: 'Vagrant',
      // description: 'Vagrant provides awesome boxes',
      // password: '',
      // date: ''
//     };

//     return request(app.getHttpServer())
//       .post('/note')
//       .send(createNoteDto)
//       .expect(500);
//   });

//   // Similar tests for other endpoints (GET, PUT, DELETE) can be added.
// });
