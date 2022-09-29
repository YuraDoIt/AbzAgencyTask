import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
  providers: [PhotoService],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
