import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile('file') file: Express.Multer.File): Promise<any> {
    if (!file)
      throw new HttpException('File was not present', HttpStatus.BAD_REQUEST);

    return this.imagesService.saveFile(file);
  }

  @Get(':id')
  async get(@Param() params: { id: number }, @Res() res: Response) {
    const image = await this.imagesService.getFileAndData(params.id);
    const Image = res.setHeader('Content-Type', image.mimetype);

    const file = createReadStream(
      ImagesService.TMP_IMAGE_DIR + '/' + image.filename,
    );

    file.pipe(res);
  }
}
