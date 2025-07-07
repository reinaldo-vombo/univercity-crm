'use server';
import cloudinary from '@/config/cloudinary';

async function uploadToCloudinary(
  file: File,
  folder?: string
): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder }, // Optional: Organize files in a folder
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );

      // Write the buffer to the Cloudinary upload stream
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}
export async function saveFile(file: File, fileName?: string): Promise<string> {
  return uploadToCloudinary(file, fileName);
}
