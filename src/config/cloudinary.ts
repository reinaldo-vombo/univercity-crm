import { v2 as cloudinary } from 'cloudinary';
import config from '@/config/env';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME, // Set in your .env file
  api_key: config.CLOUDINARY_API_KEY, // Set in your .env file
  api_secret: config.CLOUDINARY_API_SECRET, // Set in your .env file
});

export default cloudinary;
