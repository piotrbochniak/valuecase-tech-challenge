import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { createReadStream } from 'fs';

@Injectable()
export class ImagesService {
  public static TMP_IMAGE_DIR = './tmp/images';

  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  private createTmpDirIfNeeded(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const exists = fs.existsSync(ImagesService.TMP_IMAGE_DIR);

      if (!exists) {
        fs.mkdir(ImagesService.TMP_IMAGE_DIR, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }

      resolve();
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<{ id: number }> {
    await this.createTmpDirIfNeeded();

    const filename = randomUUID() + '_' + (file.filename ?? file.originalname);
    const mimetype = file.mimetype;

    await new Promise<void>((resolve) => {
      fs.writeFile(
        ImagesService.TMP_IMAGE_DIR + '/' + filename,
        file.buffer,
        {},
        () => {
          resolve();
        },
      );
    });

    const result = await this.imagesRepository.save({
      filename: filename,
      mimetype: mimetype,
    });

    return {
      id: result.id,
    };
  }

  public async getFileAndData(id: number): Promise<Image> {
    const image = await this.imagesRepository.findOneBy({ id: id });
    if (!image) throw new Error('Image not found');

    return image;
  }

  public findOne(id: number): Promise<Image> {
    return this.imagesRepository.findOneBy({ id });
  }
}
