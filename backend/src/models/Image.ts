import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Rest from './Rest';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Rest, rest => rest.images)
  @JoinColumn({ name: 'rest_id' })
  rest: Rest;
}