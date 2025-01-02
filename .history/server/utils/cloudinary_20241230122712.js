import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import dotenv from 'dotenv';

dotenv.config();

 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Add this to the top of your file to check Cloudinary config
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
  api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set'
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'forms',
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});

export const upload = multer({ storage }); 
