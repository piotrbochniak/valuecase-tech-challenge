import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Image } from '../../images/entities/image.entity';

export enum BlockType {
    TEXT = 'text',
    IMAGE = 'image',
}

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BlockType,
    default: BlockType.TEXT
  })
  type: BlockType;

  @Column()
  index: number;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 256 })
  subtitle: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => Image)
  @JoinColumn()
  image: Image;

  @Column({ nullable: true })
  imageId:  number;

  @Column()
  imageAlt: string;
}
