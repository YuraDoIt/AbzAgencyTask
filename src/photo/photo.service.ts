import { Injectable } from '@nestjs/common';
import path from 'path';
import tinify from 'tinify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhotoService {
  async uploadFile(file): Promise<string> {
    tinify.key = '8dgx236pSWXrFK6LHqZpmKPZ9WNCHCq8';

    const fileName = uuidv4() + 'jpg';
    let path1 = process.cwd();
    console.log(path.join('a', 'b', '..', 'c/', './d'));
    const filePath = path.resolve(__dirname, '..', 'client');

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
