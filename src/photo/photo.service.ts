import { Injectable } from '@nestjs/common';
import path from 'path';
import tinify from 'tinify';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import * as cloudinary from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class PhotoService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async FileZip(file): Promise<string> {
    tinify.key = '8dgx236pSWXrFK6LHqZpmKPZ9WNCHCq8';

    // await this.cloudinaryService.uploadImage(file);

    // console.log(file.buffer);
    let original = tinify.fromBuffer(file.buffer);

    const resized = original.resize({
      method: 'fit',
      width: 70,
      height: 70,
    });

    console.log(resized);
    resized.toFile('thumbnail.jpg');

    // let toFile = 'optimized.jpg';

    // sharp(original)
    //   .extract({ width: 70, height: 70, left: 70, right: 70, top: 70 })
    //   .toFile(filename)
    //   .then(function (new_file_info) {
    //     console.log('image cropped and saved');
    //   })
    //   .catch(function (err) {
    //     console.log('Error sometimes happend');
    //   });

    // const fileName = uuidv4() + 'jpg';
    // let path1 = process.cwd();
    // console.log(path.join('a', 'b', '..', 'c/', './d'));

    // await fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    // const fileName2 = uuidv4() + '.jpg';

    // const source = tinify.fromFile(path.join(filePath, fileName));
    // const resized = source.resize({
    //   method: 'cover',
    //   width: 70,
    //   height: 70,
    // });
    // resized.toFile(path.join(filePath, fileName2));

    // await fs.unlink(path.join(filePath, fileName), (err) => {
    //   if (err) console.log(err);
    // });

    // return fileName2;
    return 'yes';
  }
}
