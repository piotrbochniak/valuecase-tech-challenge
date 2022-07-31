import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  filename: string;

  @Column({ length: 64 })
  mimetype: string;
}
