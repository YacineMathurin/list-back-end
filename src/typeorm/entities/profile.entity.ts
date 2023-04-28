import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users-profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  dob: string;
}
