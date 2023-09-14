import { v2 } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const CloudinaryProvider: Provider = {
  provide: CloudinaryService,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    v2.config({
      cloud_name: configService.get('cloudinaryCloudName'),
      api_key: configService.get('cloudinaryKey'),
      api_secret: configService.get('cloudinarySecret'),
    })
    return new CloudinaryService();
  },
};
