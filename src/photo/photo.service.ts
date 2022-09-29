import { Injectable } from '@nestjs/common';
import path from 'path';
import tinify from 'tinify';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import * as cloudinary from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { Readable } from 'stream';

@Injectable()
export class PhotoService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async FileZip(file): Promise<string> {
    // tinify.key = '8dgx236pSWXrFK6LHqZpmKPZ9WNCHCq8';
    let photo = await this.cloudinaryService.uploadImage(file);
    console.log(photo.url);

    return 'yes';
  }
}
