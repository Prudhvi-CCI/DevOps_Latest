import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateNoteRequestDto {

    @IsString()
    @IsNotEmpty()
    @Expose()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    description: string;

    @Expose()
    password: string;

    @Expose()
    date: string;
}
