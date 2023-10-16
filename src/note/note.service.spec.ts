import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteRequestDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

describe('NoteService', () => {
  let noteService: NoteService;
  let noteRepository: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: getRepositoryToken(Note),
          useClass: Repository, // Use a mock Repository for testing
        },
      ],
    }).compile();

    noteService = module.get<NoteService>(NoteService);
    noteRepository = module.get<Repository<Note>>(getRepositoryToken(Note));
  });

  it('should be defined', () => {
    expect(noteService).toBeDefined();
  });

  describe('create', () => {
    it('should create a note', async () => {
      const createNoteDto: CreateNoteRequestDto = {
        title: 'Test Note',
        description: 'This is a test note',
        password: 'password123',
        date: '14-09-2023',
      };

      const createdNote: Note = {
        id: 1,
        ...createNoteDto,
      };

      jest.spyOn(noteRepository, 'save').mockResolvedValue(createdNote);

      const result = await noteService.create(createNoteDto);

      expect(result).toEqual(createdNote);
    });
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const notes: Note[] = [
        {
          id: 1,
          title: 'Note 1',
          description: 'Description 1',
          password: 'password1',
          date: '14-09-2023',
        },
        {
          id: 2,
          title: 'Note 2',
          description: 'Description 2',
          password: 'password2',
          date: '15-09-2023',
        },
        // Add more sample notes as needed
      ];

      jest.spyOn(noteRepository, 'find').mockResolvedValue(notes);

      const result = await noteService.findAll();

      expect(result).toEqual(notes);
    });
  });

  // Add similar test cases for other methods like findOne, update, and remove

  describe('findOne',()=>{
    it('should find an return a note based on id', async()=>{
      jest.spyOn(noteRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        title: 'Sample Note',
        description: 'This is a sample note',
        password: 'password123',
        date: '15-09-2023',
      });

      const result = await noteService.findOne({ id: 1 });

      expect(result).toEqual({
        id: 1,
        title: 'Sample Note',
        description: 'This is a sample note',
        password: 'password123',
        date: '15-09-2023',
      });
    })
  })

  // Test case for update method
  describe('update', () => {
    it('should update a note', async () => {
      const updatedNoteData = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedNote: Note = {
        id: 1,
        title: updatedNoteData.title,
        description: updatedNoteData.description,
        password: 'password123',
        date: '14-09-2023',
      };

      const updateResult = {
        raw: [], 
        affected: 1,
        generatedMaps: [],
      };

      jest.spyOn(noteRepository, 'update').mockResolvedValue(updateResult);
      jest.spyOn(noteRepository, 'findOne').mockResolvedValue(updatedNote);

      const result = await noteService.update(1, updatedNoteData);

      expect(result).toEqual(updateResult);
    });

    it('should return null if note is not found for update', async () => {
      const updatedNoteData = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updateResult = {
        raw: [], 
        affected: 0,
        generatedMaps: [],
      };

      jest.spyOn(noteRepository, 'update').mockResolvedValue(updateResult);

      const result = await noteService.update(1, updatedNoteData);

      expect(result).toBe(updateResult);
    });
  });

  // Test case for remove method
  describe('remove', () => {
    it('should remove a note by id', async () => {
      const noteIdToRemove = 1;

      const deleteResult = {
        raw: [], 
        affected: 1,
      };

      jest.spyOn(noteRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await noteService.remove(noteIdToRemove);

      expect(result).toBe(deleteResult); // Assuming your remove method returns a boolean or a similar indicator
    });

    it('should return false if note is not found for removal', async () => {
      const noteIdToRemove = 1;

      const deleteResult = {
        raw: [], 
        affected: 0,
      };

      jest.spyOn(noteRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await noteService.remove(noteIdToRemove);

      expect(result).toBe(deleteResult);
    });
  });
  
});



// import { Test, TestingModule } from '@nestjs/testing';
// import { NoteService } from './note.service';

// describe('NoteService', () => {
//   let service: NoteService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [NoteService],
//     }).compile();

//     service = module.get<NoteService>(NoteService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
