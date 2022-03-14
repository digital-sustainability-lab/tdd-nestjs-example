import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  title: string;
  @Column({ type: 'varchar' })
  status: 'open' | 'closed';
}
