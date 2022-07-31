import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Block } from './entities/block.entity';

import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { MoveBlockDto } from './dto/move-block.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block) private blocksRepository: Repository<Block>,
  ) {}

  async maxIndex() {
    const maxItem = await this.blocksRepository.find({
      order: { index: 'DESC' },
      take: 1,
    });
    if (maxItem.length !== 1) {
      return 0;
    }
    return maxItem[0].index;
  }

  async create(createBlockDto: CreateBlockDto) {
    const index = (await this.maxIndex()) + 1;
    return this.blocksRepository.save(
      this.blocksRepository.create({ ...createBlockDto, index }),
    );
  }

  findAll(): Promise<Block[]> {
    return this.blocksRepository.find({
      order: { index: 'ASC' },
    });
  }

  findOne(id: number): Promise<Block> {
    return this.blocksRepository.findOneBy({ id });
  }

  async update(id: number, updateBlockDto: UpdateBlockDto) {
    return this.blocksRepository.update(id, { ...updateBlockDto });
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    const removedIndex = item.index;
    await this.blocksRepository.delete(id);
    await this.blocksRepository
      .createQueryBuilder('block')
      .update(Block)
      .set({
        index: () => 'index - 1',
      })
      .where('index > :index', { index: removedIndex })
      .execute();
  }

  async move(id: number, moveBlockDto: MoveBlockDto): Promise<void> {
    if (moveBlockDto.dir !== 'up' && moveBlockDto.dir !== 'down') {
      throw new Error('Wrong direction');
    }

    const item = await this.findOne(id);
    const maxIndex = await this.maxIndex();
    if (moveBlockDto.dir === 'up') {
      if (item.index == 1 || maxIndex == 1) {
        return;
      }

      await this.blocksRepository
        .createQueryBuilder('block')
        .update(Block)
        .set({
          index: () => 'index + 1',
        })
        .where('index = :index', { index: item.index - 1 })
        .execute();

      await this.blocksRepository
        .createQueryBuilder('block')
        .update(Block)
        .set({
          index: () => 'index - 1',
        })
        .where('id = :id', { id: item.id })
        .execute();
    } else {
      if (item.index == maxIndex || maxIndex == 1) {
        return;
      }

      await this.blocksRepository
        .createQueryBuilder('block')
        .update(Block)
        .set({
          index: () => 'index - 1',
        })
        .where('index = :index', { index: item.index + 1 })
        .execute();

      await this.blocksRepository
        .createQueryBuilder('block')
        .update(Block)
        .set({
          index: () => 'index + 1',
        })
        .where('id = :id', { id: item.id })
        .execute();
    }
  }
}
