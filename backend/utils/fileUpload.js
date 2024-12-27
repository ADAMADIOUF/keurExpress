import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, 
  params: {
    folder: 'routine', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
      { width: 500, height: 500, crop: 'limit' }, 
    ],
  },
});

export default storage;
