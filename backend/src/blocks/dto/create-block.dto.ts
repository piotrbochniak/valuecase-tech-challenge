import { BlockType } from '../entities/block.entity';

export class CreateBlockDto {
    type: BlockType;
    title: string;
    subtitle: string;
    body: string;
    imageId: number;
    imageAlt: string;
}
