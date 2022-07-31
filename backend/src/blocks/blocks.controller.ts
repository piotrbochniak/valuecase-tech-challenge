import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { BlocksService } from './blocks.service';

import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { MoveBlockDto } from './dto/move-block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get()
  findAll() {
    return this.blocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(+id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blocksService.remove(+id);
  }

  @Post('move/:id')
  move(@Param('id') id: string, @Body() moveBlockDto: MoveBlockDto) {
    return this.blocksService.move(+id, moveBlockDto);
  }
}
