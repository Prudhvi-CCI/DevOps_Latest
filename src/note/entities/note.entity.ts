import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({ type: 'varchar' })
  date: string;
}