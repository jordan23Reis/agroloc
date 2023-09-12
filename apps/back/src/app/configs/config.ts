export const config = () => ({
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JTW_TOKEN,
    mongoUri: process.env.MONGO_URI,
    cloudinaryUrl: process.env.CLOUDINARY_URL
});