import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dkuxp7gfq',
      api_key: '825987552214116',
      api_secret: 'OFJ7uxYwwo5bce2QG_PDq9lEH1c',
    });
  },
};
