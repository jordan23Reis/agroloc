import dotenv from 'dotenv';
dotenv.config();

export const config = () => ({
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JTW_TOKEN,
  jwtExpireTime: process.env.JTW_EXPIRE_TIME,
  sessionSecret: process.env.SESSION_SECRET,
  mongoUri: process.env.MONGO_URI,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
});
