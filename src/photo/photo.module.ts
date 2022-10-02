import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/photo/cloudinary.service';
import { CloudinaryProvider } from 'src/photo/cloudinary.provider';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService],
  controllers: [],
})
export class PhotoModule {}
