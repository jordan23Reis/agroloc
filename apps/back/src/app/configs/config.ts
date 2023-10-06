import dotenv from 'dotenv';
dotenv.config();

export const config = () => ({
  port: process.env.PORT || 3000,

  jwtSecret: process.env.JTW_TOKEN,
  jwtExpireTime: process.env.JTW_EXPIRE_TIME,
  
  mongoUri: process.env.MONGO_URI,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,

  asaasVersao: process.env.ASAAS_VERSAO,
  asaasUrlBase: process.env.ASAAS_URL_BASE,
  asaasToken: process.env.ASAAS_TOKEN,
});
