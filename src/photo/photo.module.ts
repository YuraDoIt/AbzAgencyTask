import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [PhotoService, CloudinaryService, CloudinaryProvider],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
