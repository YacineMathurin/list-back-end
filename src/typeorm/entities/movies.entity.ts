import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'longblob' })
  thumbnail: Buffer;

  @Column()
  createdAt: Date;
}