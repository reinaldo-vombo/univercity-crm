import { v2 as cloudinary } from 'cloudinary';
import { serverEnv } from '@/config/env';

cloudinary.config({
  cloud_name: serverEnv.CLOUDINARY_CLOUD_NAME, // Set in your .env file
  api_key: serverEnv.CLOUDINARY_API_KEY, // Set in your .env file
  api_secret: serverEnv.CLOUDINARY_API_SECRET, // Set in your .env file
});

export default cloudinary;
