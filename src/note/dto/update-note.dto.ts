import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteRequestDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteRequestDto) {}
